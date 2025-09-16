import z from "zod";
export const CreateUserSchema = z.object({
  username: z.string().min(8, "minimum 8 charaters requierd "),
  password: z.string().min(8, "minimum 8 charaters requierd "),
  name: z.string().min(4, "minimum 4 charaters requierd "),
});

export const SignInSchema = z.object({
  username: z.string().min(8, "minimum 8 charaters requierd "),
  password: z.string().min(8, "minimum 8 charaters requierd "),
});
export const CreateRoomSchema = z.object({
  slug: z.string().min(3, "minimum 3 charaters requierd ").max(10),
});