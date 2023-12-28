import React from "react";
import Image from '../../assets/signup.svg'
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider/useAuth";

export default function Login() {
  let navigate = useNavigate();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onFinish(data) {
    if (!data.email | !data.emailConf | !data.password) {
      alert("Preencha todos os campos");
    } else if (data.email !== data.emailConf) {
      alert("Emails não conferem");
    }
    try {
      auth.signup(data.email, data.password, data.name);

      alert("Usuário cadastrado com sucesso");
      navigate("../", { replace: true });
      console.log("Cadastrado");
    } catch (error) {
      console.log("error catch:" + error);
    }
  }

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <div className="hidden lg:block relative w-0 flex-1 bg-blue-700">
        <div className="h-full flex justify-center items-center">
        <img src={Image} width={700}/>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-100">
          <div>
            <h2 className="mt-6 align-left text-blue-700 text-2xl font-bold">
              CREATE AN ACCOUNT
            </h2>
            <p className="mt-6 text-gray-600 text-1xl max-w">
              Already have a account?{" "}
              <Link to="/" className="text-blue-700 font-semibold">
                &nbsp;Back to Login
              </Link>
            </p>
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onFinish)} className="text-sm">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  {...register("name")}
                  className="apperance-none block w-full py-3 px-4 
                  leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                   border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-mail adress "
                  name="email"
                  {...register("email")}
                  className="apperance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Repeat the e-mail adress"
                  name="emailConf"
                  {...register("emailConf")}
                  className="apperance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password")}
                  className="apperance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded shadow"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
