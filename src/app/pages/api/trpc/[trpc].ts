import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env";
import { createTRPCContext } from "~/server/api/routers/trpc";
import { appRouter } from "~/server/api/routers/root";
// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
