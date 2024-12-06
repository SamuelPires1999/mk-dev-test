import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { addUserFormType } from "../lib/yup/addUserForm";
import { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  handleSubmit: UseFormHandleSubmit<addUserFormType>;
  onSubmit: SubmitHandler<addUserFormType>;
  emailInputProps: InputHTMLAttributes<HTMLInputElement>;
  nameInputProps: InputHTMLAttributes<HTMLInputElement>;
  ageInputProps: InputHTMLAttributes<HTMLInputElement>;
  companyInputProps: InputHTMLAttributes<HTMLInputElement>;
  errors: FieldErrors<addUserFormType>;
}

export default function AddUserForm(props: Props) {
  const { t } = useTranslation();
  return (
    <form
      onSubmit={props.handleSubmit(props.onSubmit)}
      className="mb-4 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <input {...props.nameInputProps} />
        <span className="text-xs text-red-500">
          {props.errors.name?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input {...props.emailInputProps} />
        <span className="text-xs text-red-500">
          {props.errors.email?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input {...props.companyInputProps} />
        <span className="text-xs text-red-500">
          {props.errors.company?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input {...props.ageInputProps} />
        <span className="text-xs text-red-500">
          {props.errors.age?.message}
        </span>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded col-span-2 disabled:cursor-not-allowed"
        disabled={props.loading}
      >
        {props.loading
          ? t("form_submitButtonLoading")
          : t("form_submitButtonLabel")}
      </button>
    </form>
  );
}
