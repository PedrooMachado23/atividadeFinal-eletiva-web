import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Esta página não existe.</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para página inicial.
        </a>
      </div>
    </div>
  );
};

export default NotFound;
