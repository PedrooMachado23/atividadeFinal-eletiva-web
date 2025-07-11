import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductsTable from './ProductsTable';
import UserManagement from './UserCreation';
import ChangePsswdModal from './ChangePsswdModal';
import usuarioAPI from '@/api/usuarioAPI';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface PsswdObj {
    psswd: string
    retypedPsswd: string
    newPsswd: string
}

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'produtos' | 'users'>('produtos');
  const [openPsswdModal, setOpenPsswdModal] = useState<boolean>(false)

  const handleChange = async (data: PsswdObj) => {
    let toastTitle = 'Sucesso!'
    let toastDescription = 'A senha foi alterada'
    const username = user.username

    try {
      await usuarioAPI.put('/updatePsswd', {
        username: username,
        typedPsswd: data.psswd,
        newPsswd: data.newPsswd
      })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastTitle = 'Erro!'
        toastDescription = 'Não foi possível alterar a senha neste momento.'

        if (error.response.status === 401) {
          toastDescription = 'A senha que inseriu está incorreta.'
        }
      }
    }

    toast({
      title: toastTitle,
      description: toastDescription
    })

    closeModal()
  }

  const closeModal = () => {
    setOpenPsswdModal(false)
  }

  return (
    //header
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-800">
                {`Dashboard de ${activeTab}`}
              </h1>
              
              {isAdmin && (
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('produtos')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'produtos'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Produtos
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'users'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Usuários
                  </button>
                </nav>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bem vindo, {user?.nome}</span>
              <button
                onClick={() => {setOpenPsswdModal(true)}}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Trocar senha
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* main content */}
      <main className="py-8">
        {/* users can only access the products dashboard */}
        {!isAdmin || activeTab === 'produtos' ? (
          <ProductsTable />
        ) : (
          <UserManagement />
        )}
        {openPsswdModal ? (
          <ChangePsswdModal
            isOpen={openPsswdModal}
            onClose={closeModal}
            onChange={handleChange}
          />
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
