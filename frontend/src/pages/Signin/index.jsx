import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider/useAuth";
import Image from '../../assets/login.svg'

export default function Login() {
  let navigate = useNavigate();

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onFinish(data) {
    try {
      await auth.authenticate(data.email, data.password);

      toast.success("Logado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("../dashboard", { replace: true });
    } catch (error) {
      toast.error("E-mail or password incorret", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <div className="bg-neutral-100 flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-20">
        <div className="mx-auto w-full max-w-sm lg:w-100">
          <div>
            <h2 className="mt-6 text-left text-blue-700 text-2xl font-bold">
              ACCOUNT LOGIN
            </h2>
            <p className="mt-6 text-gray-500 text-1xl max-w">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-700 font-semibold">
                &nbsp;Sign Up
              </Link>
            </p>
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onFinish)} className=" text-sm">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email Adress"
                  name="email"
                  {...register("email")}
                  className="apperance-none block w-full py-3 px-4 
                  leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                   border-gray-200 focus:border-blue-200 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password")}
                  className="apperance-none block w-full py-3 px-4 leading-tight
                   text-gray-700 bg-gray-50 focus:bg-white border border-gray-200
                    focus:border-blue-200 rounded focus: outline-none"
                />
                <Link
                  to="/forget-password"
                  className="text-blue-700 font-semibold"
                >
                  &nbsp;Forget password
                </Link>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="inline-block w-full py-4 px-8 leading-none
                   text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded shadow"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1 bg-blue-700">
        <div className="h-full flex justify-center items-center">
        <img src={Image} width={700}/>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
