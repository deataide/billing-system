import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useParams } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const auth = useAuth();

  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onFinish(data) {
    try {
      if (data.password !== data.passwordConfirm) {
        console.log("Senhas não conferem");
      }

      await auth.newPassword(data.password, token);
    } catch (error) {
      console.log("error catch:" + error);
    }
  }

  return (
    <div className="bg-neutral-100 flex min-h-screen">
      <div className="hidden lg:block relative w-0 flex-1 bg-blue-700">
        <div className="h-full flex justify-center items-center"></div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="my-6 text-left text-blue-700 text-2xl font-bold">
              Type your new password...
            </h2>
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onFinish)} className="text-sm">
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Type your new password.."
                  name="password"
                  {...register("password")}
                  className="apperance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Repeat your new password"
                  name="passwordConfirm"
                  {...register("passwordConfirm")}
                  className="apperance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded shadow"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
