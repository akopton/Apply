import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { status } from "@prisma/client";

export const applicationRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        position: z.string(),
        company: z.string(),
        status: z.string(),
        platform: z.object({ id: z.string(), url: z.string() }),
        comment: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const application = await ctx.prisma.application.create({
        data: {
          position: input.position,
          company: input.company,
          platform: {
            connectOrCreate: {
              where: {
                id: input.platform.id,
              },
              create: {
                url: input.platform.url,
              },
            },
          },
          status: {
            connect: {
              name: input.status as status,
            },
          },
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return application;
    }),
});
