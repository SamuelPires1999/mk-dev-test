import { InferType, number, object, string } from "yup";

export const addUserFormSchema = object({
  name: string().required(),
  age: number().required(),
  email: string().email().required(),
  company: string().required(),
});

export type addUserFormType = InferType<typeof addUserFormSchema>;
