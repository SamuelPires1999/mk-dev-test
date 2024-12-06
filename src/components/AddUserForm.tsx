import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { addUserFormType } from "../lib/yup/addUserForm";
import { InputHTMLAttributes } from "react";

interface Props {
  loading: boolean;
  handleSubmit: UseFormHandleSubmit<addUserFormType>;
  onSubmit: SubmitHandler<addUserFormType>;
  emailInputProps: InputHTMLAttributes<HTMLInputElement>;
  nameInputProps: InputHTMLAttributes<HTMLInputElement>;
  ageInputProps: InputHTMLAttributes<HTMLInputElement>;
  companyInputProps: InputHTMLAttributes<HTMLInputElement>;
}

export default function AddUserForm(props: Props) {
  return (
    <form
      onSubmit={props.handleSubmit(props.onSubmit)}
      className="mb-4 grid grid-cols-2 gap-4"
    >
      <input {...props.nameInputProps} />
      <input {...props.emailInputProps} />
      <input {...props.companyInputProps} />
      <input {...props.ageInputProps} />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded col-span-2 disabled:cursor-not-allowed"
        disabled={props.loading}
      >
        {props.loading ? "Adding user..." : "Add User"}
      </button>
    </form>
  );
}
