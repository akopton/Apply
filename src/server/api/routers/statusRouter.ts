import { createTRPCRouter, publicProcedure } from "../trpc";

export const statusRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const statusList = await ctx.prisma.status.findMany();
    return statusList;
  }),
});
