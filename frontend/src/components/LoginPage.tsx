
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from '@/hooks/use-toast';
import usuarioAPI from '@/api/usuarioAPI';

const LoginPage = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorCount, setErrorCount] = useState<number>(0)
  const [lastTryUser, setLastTryUser] = useState<string>('')
  const [error, setError] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const { error_code, message } = await login(username, password);

    if (error_code !== 0) {
      if (error_code === 401) {
        console.log(username, lastTryUser)
        //verification to dont block a random user in the third error
        if (username === lastTryUser) {
          //error counting to block user account
          const currentAttempt = errorCount
          setErrorCount(errorCount + 1)

          if (currentAttempt + 1 === 3) {
            await usuarioAPI.put(`/block/${username}`, )

            setErrorCount(0)

            setError('Conta bloqueada por tentativas excessivas')
            return
        }
        }
        setLastTryUser(username)
      }
      
      //custom error message from the request
      setError(message)
    } else {
      toast({
      title: 'Login feito!',
      description: 'Seu usuário foi autenticado com sucesso.'
    })
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem vindo de volta!</h1>
          <p className="text-gray-600">Por favor, entre com sua conta.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
