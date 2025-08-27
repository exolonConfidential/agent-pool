import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use((opts) => {
  if (!opts.ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized! Please login."
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      auth: opts.ctx.session,
    },
  });
});
