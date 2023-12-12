
import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";


export default function CreateBills() {

  const user = getUserLocalStorage()
const auth = useAuth();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    async function onFinish(data){

        try {
            console.log(user._id)
            
        const response = await apiWithToken.post(`createBill/${user._id}`, {cpfOrCnpj: data.cnpj,
            name: data.name})
    
            console.log(response)
            
            if(!response){
              console.log('Erro ao apagar')
            }
          
            return console.log(response)
            
        } catch (error) {
            console.log(error)
        }

        }


    return (
        <div className="bg-purple-400 flex min-h-screen">
          <div className="hidden lg:block relative w-0 flex-1 bg-purple-900">
            <div className="h-full flex justify-center items-center">

            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-6 text-center text-white text-3xl font-semibold">
                  Entrar
                </h2>

              </div>
              <div className="mt-2">
                <form onSubmit={handleSubmit(onFinish)}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Cnpj"
                      name="cnpj"
                      {...register("cnpj")}
                      className="apperance-none block w-full py-3 px-4 
                      leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                       border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      {...register("name")}
                      className="apperance-none block w-full py-3 px-4 leading-tight
                       text-gray-700 bg-gray-50 focus:bg-white border border-gray-200
                        focus:border-pink-700 rounded focus: outline-none"
                    />

                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="inline-block w-full py-4 px-8 leading-none
                       text-white bg-pink-700 hover:bg-pink-900 font-semibold rounded shadow"
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
