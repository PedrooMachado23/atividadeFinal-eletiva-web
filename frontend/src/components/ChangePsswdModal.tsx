import { toast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import React, { useState } from "react"

interface PsswdObj {
    psswd: string
    retypedPsswd: string
    newPsswd: string
}

interface PsswdModalProps {
    isOpen: boolean
    onClose: () => void
    onChange: (data: PsswdObj) => void
}

const ChangePsswdModal = ({ isOpen, onClose, onChange }: PsswdModalProps) => {
    const [formData, setFormData] = useState<PsswdObj>({
        psswd: '',
        retypedPsswd: '',
        newPsswd: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        if (formData.newPsswd !== formData.retypedPsswd) {
            toast({
                title: 'Erro',
                description: "As senhas não combinam"
            })
        }
        e.preventDefault()
        onChange(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Troque sua senha
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Senha atual: </label>
                        <input type="password" 
                            value={formData.psswd}
                            onChange={(e) => setFormData({...formData, psswd: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nova senha:</label>
                        <input
                            type="password"
                            value={formData.newPsswd}
                            onChange={(e) => setFormData({ ...formData, newPsswd: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Digite novamente:</label>
                        <input
                        type="password"
                        value={formData.retypedPsswd}
                        onChange={(e) => setFormData({ ...formData, retypedPsswd: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                        Cancelar
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        Trocar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePsswdModal