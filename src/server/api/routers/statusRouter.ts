import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const statusRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const statusList = await ctx.prisma.status.findMany();
    return statusList;
  }),

  getApplicationsForSingleStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const list = await ctx.prisma.status.findMany({
      include: {
        _count: {
          select: { applications: { where: { ownerId: user.id } } },
        },
      },
    });
    return list;
  }),
});
