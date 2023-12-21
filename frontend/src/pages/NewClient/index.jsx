import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { FaAngleLeft } from "react-icons/fa";

export default function CreateClient() {
  const user = getUserLocalStorage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onFinish(data) {
    try {
      const response = await apiWithToken.post("create-client", {
        id: user,
        name: data.name,
        email: data.email,
        phone: { ddd: data.ddd, number: data.numberPhone },
        adress: {
          street: data.street,
          number: data.houseNumber,
          city: data.city,
        },
      });

      if (!response) {
        toast.error("Internal server error", {
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

      toast.success("Client sucessfull registered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("../home", { replace: true });
      }, 500);
    } catch (error) {
      toast.error(error + " Don't forget to fill in all the fields", {
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

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className="bg-neutral-200 flex-row min-h-screen w-full">
      <div className="flex-col m-12 md:flex-row flex ">
        <button
          className="hover:bg-blue-700 rounded-full p-4 text-black"
          onClick={navigateBack}
        >
          <FaAngleLeft />
        </button>
        <h1 className="text-center p-2 text-4xl font-bold">New Client</h1>
      </div>

      <div className="mt-2">
        <form onSubmit={handleSubmit(onFinish)} className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                {...register("name")}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-4">
            <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
              <label
                htmlFor="ddd"
                className="block text-sm font-medium text-gray-600"
              >
                DDD
              </label>
              <input
                type="text"
                id="ddd"
                name="ddd"
                {...register("ddd")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-3/4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                {...register("phoneNumber")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-600"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              {...register("street")}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="houseNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Home Number
              </label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                {...register("houseNumber")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                {...register("city")}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
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
