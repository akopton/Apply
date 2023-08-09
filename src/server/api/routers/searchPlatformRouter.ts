import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const searchPlatformRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const platforms = await ctx.prisma.searchPlatform.findMany();
    return platforms;
  }),

  getApplicationsForSinglePlatform: protectedProcedure.query(
    async ({ ctx }) => {
      const user = ctx.session.user;
      const list = await ctx.prisma.searchPlatform.findMany({
        include: {
          _count: {
            select: { applications: { where: { ownerId: user.id } } },
          },
        },
      });
      return list;
    }
  ),
});
