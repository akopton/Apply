import { createTRPCRouter } from "@/server/api/trpc";
import { applicationRouter } from "./routers/applicationRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
