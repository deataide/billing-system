import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-blue-700 mb-4 font-bold">404 - Página não encontrada</h1>
      <p className="text-lg text-gray-600 text-center">
        Desculpe, a página que você está procurando não existe.
      </p>
      {/* Adicione mais conteúdo conforme necessário */}
    </div>
  );
};

export default NotFound;
