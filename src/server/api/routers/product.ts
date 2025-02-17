import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  // 👋 Simple greeting for testing
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // 🛍️ Create a new product
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1), // Name must be at least 1 character
        category: z.string().min(1), // Category required
        price: z.number().positive(), // Price must be positive
        quantity: z.number().int().min(0), // Quantity should be an integer >= 0
        status: z.enum(["Available", "Low stock", "Out of Stock"]), // Strict enum values
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          category: input.category,
          price: input.price,
          quantity: input.quantity,
          status: input.status,
        },
      });
    }),

  // 📌 Fetch latest product
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  // 📋 Fetch all products
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  // 🔍 Search products by name or category
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        where: {
          OR: [
            { name: { contains: input.query, mode: "insensitive" } },
            { category: { contains: input.query, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  // ✏️ Update a product
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(), // Ensure it's a valid UUID
        name: z.string().min(1),
        category: z.string().min(1),
        price: z.number().positive(),
        quantity: z.number().int().min(0),
        status: z.enum(["Available", "Low stock", "Out of Stock"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          category: input.category,
          price: input.price,
          quantity: input.quantity,
          status: input.status,
        },
      });
    }),

  // 🗑️ Delete a product
  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() })) // Validate UUID
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});
