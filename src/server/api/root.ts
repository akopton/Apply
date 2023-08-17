import { createTRPCRouter } from "@/server/api/trpc";
import { applicationRouter } from "./routers/applicationRouter";
import { searchPlatformRouter } from "./routers/searchPlatformRouter";
import { statusRouter } from "./routers/statusRouter";
import { statusUpdateRouter } from "./routers/statusUpdatesRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  application: applicationRouter,
  status: statusRouter,
  searchPlatform: searchPlatformRouter,
  statusUpdate: statusUpdateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
