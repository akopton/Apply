import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { status } from "@prisma/client";

export const statusUpdateRouter = createTRPCRouter({
  addNew: protectedProcedure
    .input(
      z.object({
        status: z.string(),
        updatedAt: z.date(),
        applicationId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.prisma.applicationStatusUpdate.create({
        data: {
          updatedAt: input.updatedAt,
          status: {
            connect: {
              name: input.status as status,
            },
          },
          application: {
            connect: {
              id: input.applicationId,
            },
          },
        },
      });
      return application;
    }),
});
