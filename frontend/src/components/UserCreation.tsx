
import usuarioAPI from '@/api/usuarioAPI';
import { toast } from '@/hooks/use-toast';
import React, { useState } from 'react';

const UserCreation = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nome: '',
    tipo: '' as '0' | '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    let toastTitle = 'Sucesso'
    let toastDescription = 'Usuario Criado com sucesso'

    e.preventDefault();
    
    try {
      await usuarioAPI.post('/create',formData)

    } catch (error) {
      console.log(`Erro ao criar usuário: ${error}`)

      toastTitle = 'Erro'
      toastDescription = 'Não foi possível criar o usuário'
    }

    handleCancel();

    toast({
      title: toastTitle,
      description: toastDescription
    })
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      password: '',
      nome: '',
      tipo: '0',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Register New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as '0' | '1'})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreation;
