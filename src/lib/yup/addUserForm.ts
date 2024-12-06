import { InferType, number, object, string } from "yup";

export const addUserFormSchema = object({
  name: string().required("Name is required"),
  age: number()
    .required("Age is required")
    .typeError("Age needs to be a valid number"),
  email: string()
    .email("Email needs to be valid")
    .required("Email is required"),
  company: string().required("Company is required"),
});

export type addUserFormType = InferType<typeof addUserFormSchema>;
