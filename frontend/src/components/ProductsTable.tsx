
import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ProductModal from './ProductModal';
import produtoAPI from '@/api/produtoAPI';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  nome: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  preco: number;
}

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchAllProducts = async () => {
    try {
      const response = await produtoAPI.get('/fetch')

      const data = response.data.products

      console.log('produto', data)

      setProducts(data)
    } catch (error) {
      console.log('Erro ao buscar produtos', error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setModalOpen(true);
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    let toastTitle = 'Sucesso!'
    let toastDescription = 'O produto foi salvo.'

    try {
      if (editingProduct) {
        const response = await produtoAPI.put('/update', productData)
        

      } else {
        const response = await produtoAPI.post('/create', productData)

      }

      await fetchAllProducts()
    } catch (error) {
      console.log(`Erro ao salvar produto: ${error}`)
      
      toastTitle = 'Erro!'
      toastDescription = 'Não foi possível finalizar a operação.'
    }

    toast({
          title: toastTitle,
          description: toastDescription,
        })
  };

  const handleDelete = async (codigo: string) => {
    let toastTitle = 'Sucesso!'
    let toastDescription = 'O produto foi deletado.'
    if (deleteConfirm === codigo) {
        try {
          await produtoAPI.delete(`/delete/${codigo}`)

        } catch (error) {
          console.log('Erro ao deletar o produto: ', error)

          toastTitle = 'Erro!'
          toastDescription = 'Não foi possível deletar o produto'
        }

        toast({
        title: toastTitle,
        description: toastDescription
      })

        setDeleteConfirm(null)

        fetchAllProducts()
      } else {
        setDeleteConfirm(codigo)
      }
      
  };

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID do Produto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Detalhes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acões</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{product.codigo}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)}
                        className="text-left text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {product.nome}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.codigo)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === product.codigo
                              ? 'bg-red-100 text-red-700'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          title={deleteConfirm === product.codigo ? 'Click again to confirm' : 'Delete'}
                        >
                          {deleteConfirm === product.codigo ? "Confirmar ?" : <Trash2 size={20} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === product.id && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 bg-gray-50">
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Descrição:</span> {product.descricao}</p>
                          <p><span className="font-semibold">Quantidade:</span> {product.quantidade}</p>
                          <p><span className="font-semibold">Preço:</span> R${product.preco.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Registrar produto
        </button>
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        produto={editingProduct}
        title={editingProduct ? 'Edit Product' : 'Register Product'}
        isEditing={editingProduct}
      />
    </div>
  );
};

export default ProductsTable;
