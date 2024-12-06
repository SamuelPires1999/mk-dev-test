import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { clearUsers } from "./state/user/userSlice";
import { addUser } from "./state/user/actions/addUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { addUserFormSchema, addUserFormType } from "./lib/yup/addUserForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AddUserForm from "./components/AddUserForm";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

function App() {
  const { users, error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [simulateError, setSimulateError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addUserFormType>({
    resolver: yupResolver(addUserFormSchema),
  });

  const onSubmit: SubmitHandler<addUserFormType> = (data) => {
    dispatch(addUser({ newUser: data, shouldFail: simulateError }));
  };

  const handleClearUsers = () => {
    dispatch(clearUsers());
  };

  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{t("mainTitle")}</h1>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="simulateError"
            checked={simulateError}
            onChange={() => setSimulateError(!simulateError)}
            className="mr-2"
          />
          <label htmlFor="simulateError">
            {t("simulateApiErrorButtonLabel")}
          </label>
        </div>
        <div className="mb-4">
          <button
            onClick={handleClearUsers}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {t("clearUserButtonLabel")}
          </button>
        </div>
        <div className="flex gap-10 my-10">
          <button
            className="rounded-md px-5 bg-blue-200"
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <button
            className="rounded-md px-5 bg-green-200"
            onClick={() => changeLanguage("pt")}
          >
            Portugues
          </button>
          <button
            className="rounded-md px-5 bg-red-200"
            onClick={() => changeLanguage("cn")}
          >
            中国
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <AddUserForm
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          ageInputProps={{
            type: "number",
            placeholder: t("form_ageLabel"),
            className: "border p-2 rounded",
            ...register("age"),
          }}
          nameInputProps={{
            type: "text",
            placeholder: t("form_nameLabel"),
            className: "border p-2 rounded",
            ...register("name"),
          }}
          companyInputProps={{
            type: "text",
            placeholder: t("form_companyLabel"),
            className: "border p-2 rounded",
            ...register("company"),
          }}
          emailInputProps={{
            type: "text",
            placeholder: t("form_emailLabel"),
            className: "border p-2 rounded",
            ...register("email"),
          }}
          loading={loading}
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">{t("listTitle")}</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found</p>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>{t("card_name")}:</strong> {user.name}
                    </p>
                    <p>
                      <strong>{t("card_email")}:</strong> {user.email}
                    </p>
                    <p>
                      <strong>{t("card_company")}:</strong> {user.company}
                    </p>
                    <p>
                      <strong>{t("card_age")}:</strong> {user.age}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
