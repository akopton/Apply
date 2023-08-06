import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {}),
});
