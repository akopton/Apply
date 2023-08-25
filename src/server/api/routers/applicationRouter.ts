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
        platform: z.string(),
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
                url: input.platform,
              },
              create: {
                url: input.platform,
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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const applications = await ctx.prisma.application.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        addedAt: "desc",
      },
      include: {
        statusUpdates: {
          include: {
            status: true,
          },
        },
      },
    });

    return applications;
  }),

  getTop: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const user = ctx.session.user;
    const applications = await ctx.prisma.application.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        addedAt: "desc",
      },
      include: {
        statusUpdates: {
          include: { status: true },
        },
      },
      take: input,
    });

    return applications;
  }),

  getSingleById: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const application = await ctx.prisma.application.findUnique({
        where: {
          ownerId: user.id,
          id: input,
        },
        include: {
          platform: true,
          status: true,
          statusUpdates: {
            include: {
              status: true,
            },
          },
        },
      });
      return application;
    }),

  getAllApplicationsCountForUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const applications = await ctx.prisma.application.count({
      where: {
        ownerId: user.id,
      },
    });

    return applications;
  }),

  deleteWithId: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedApplication = await ctx.prisma.application.delete({
        where: {
          id: input,
        },
      });
      return deletedApplication;
    }),

  updateStatusWithId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.prisma.application.update({
        where: {
          id: input.id,
        },
        data: {
          status: {
            connect: {
              name: input.status as status,
            },
          },
        },
      });
      return application;
    }),
});
