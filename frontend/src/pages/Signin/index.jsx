import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider/useAuth';
import Image from '../../assets/undraw.svg';

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

      alert('Login realizado');

      navigate('../dashboard', { replace: true });
    } catch (error) {
      alert('Dados incorretos');
    }
  }

  return (
    <div className="bg-purple-400 flex min-h-screen">
      <div className="hidden lg:block relative w-0 flex-1 bg-purple-900">
        <div className="h-full flex justify-center items-center">
          <img src={Image} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-center text-white text-3xl font-semibold">
              Entrar
            </h2>
            <p className="mt-6 text-gray-600 text-sm max-w">
              Novo por aqui?{' '}
              <Link to="/signup" className="text-purple-900 font-semibold">
                &nbsp;Registre-se
              </Link>
            </p>
          </div>
          <div className="mt-2">
            <form onSubmit={handleSubmit(onFinish)}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...register('email')}
                  className="apperance-none block w-full py-3 px-4 
                  leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                   border-gray-200 focus:border-gray-500 rounded focus: outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register('password')}
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
