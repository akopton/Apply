import { createTRPCRouter, publicProcedure } from "../trpc";

export const searchPlatformRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const platforms = await ctx.prisma.searchPlatform.findMany();
    return platforms;
  }),
});
