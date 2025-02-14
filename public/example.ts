// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// const idSchema = z.object({ id: z.string() });

// const productSchema = z.object({
//   name: z.string(),
//   email: z.string(),
//   category: z.string(),
//   price: z.number(),
//   quantity: z.number(),
//   status: z.string(),
// });

// const producUpdateSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   email: z.string(),
//   category: z.string(),
//   price: z.number(),
//   quantity: z.number(),
//   status: z.string(),
// });

// export const exampleRouter = createTRPCRouter({
//   //get all product
//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.product.findMany();
//   }),

//   //get product by id
//   getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
//     return ctx.prisma.product.findUnique({
//       where: idSchema.parse(input),
//     });
//   }),

//   //create product
//   createProduct: publicProcedure
//     .input(productSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.product.create({
//         data: productSchema.parse(input),
//       });
//     }),

//   //update product
//   updateProduct: publicProcedure
//     .input(producUpdateSchema)
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.product.update({
//         where: {
//           id: input.id.toString(),
//         },
//         data: producUpdateSchema.parse(input),
//       });
//     }),

//   //delete product
//   deleteProduct: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
//     return ctx.prisma.product.delete({
//       where: idSchema.parse(input),
//     });
//   }),
// });
