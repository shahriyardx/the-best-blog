import z from "zod";

export const CommentSchema = z.object({
  post_id: z.string().uuid(),
  content: z.string(),
});

export type CommentInput = z.TypeOf<typeof CommentSchema>;
