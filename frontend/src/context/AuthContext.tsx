
import usuarioAPI from '@/api/usuarioAPI';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

//Also JWTPayload interface
interface Usuario {
  username: string
  nome: string
  tipo: string //admin or user string
}

interface AuthContextType {
  user: Usuario | null
  token: string | null
  login: (username: string, password: string) => Promise<{ error_code: number; message: string }>
  logout: () => void
  isAdmin: boolean //admin or user validation
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  //auth based on localStorage items
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem('atividadefinal-eletiva-web-user')

    return storedUser ? JSON.parse(storedUser) : null
})
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('atividadefinal-eletiva-web-token')
  })

  useEffect(() => {
    //periodically verify if the token is valid
    const verifyToken = async () => {
      const userToken = localStorage.getItem('atividadefinal-eletiva-web-token')

      try {
        const response = await usuarioAPI.post('/verifyToken', {
        token: userToken
      })
      } catch (error) {
        logout()
      }
    }

    const intervalId = setInterval(() => {
      verifyToken()
    },  15 * 1000)

    return () => clearInterval(intervalId)
  }, [token])
 
  const login = async (username: string, password: string): Promise<{ error_code: number; message: string }> => {
    //uses message from the backend to determine what was the error
    let error_code = 0
    let message = ''

    try {
      const response = await usuarioAPI.post('/auth', {
        username: username,
        password: password
      })

       message = response.data.message

      if (response) {
        const data = response.data

        //using only the information inside the token for increased security
        const responseToken = data.token
        const decoded = jwtDecode<Usuario>(responseToken)

        const usuarioObj: Usuario = {
          username: decoded.username,
          nome: decoded.nome,
          tipo: decoded.tipo,
        }

        setUser(usuarioObj)
        setToken(responseToken)

        localStorage.setItem('atividadefinal-eletiva-web-user', JSON.stringify(usuarioObj))
        localStorage.setItem('atividadefinal-eletiva-web-token', responseToken)
      }

      return { message, error_code}
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error_code = error.response.status
        message = error.response.data.message || 'Error'
        
        return {
          error_code,
          message
        }
      }
    }
  }

  const logout = async () => {
    //remove all user objects and data
    setUser(null)
    setToken(null)

    localStorage.removeItem('atividadefinal-eletiva-web-user')
    localStorage.removeItem('atividadefinal-eletiva-web-token')
  }

  //verification for component rendering
  const isAdmin = user?.tipo === "0"

  return(
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}