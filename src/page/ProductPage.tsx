import { useNavigate } from 'react-router-dom'
import ProductComponent from '../components/Product'
import SearchComponent from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useState } from 'react'
import Modal from '../components/Modal'
import { tProduct } from '../types/Product'
import { deleteProduct, getProduct } from '../redux/productSlice'
import UrutComponent from '../components/Urut'

export default function ProductPage() {
  const navigate = useNavigate()

  //   const productSelector = useSelector(addProduct)
  const products = useSelector((state: RootState) => state.product.products)
  const product = useSelector((state: RootState) => state.product.product)

  const dispatch = useDispatch()

  const handleClickAdd = () => {
    navigate('/create')
  }

  const handleEditProduct = (prop: any) => {
    navigate(`/edit/${prop}`)
  }

  const [isDataDelete, setIsDataDelete] = useState<tProduct | null>({})

  const handleDeleteProduct = (prop: any) => {
    // navigate(`/edit/${prop}`)
    dispatch(getProduct(prop))

    setIsDataDelete(product)
    document.getElementById('my_modal_1')?.showModal()
  }

  const handleDelete = async () => {
    await dispatch(deleteProduct(isDataDelete?.uuid))
    alert('data berhasil di delete')
    setIsDataDelete(null)
  }

  return (
    <>
      <div className="mx-auto p-3 relative">
        <div className="flex justify-between">
          <SearchComponent />
          <UrutComponent />
          <button className="btn" onClick={handleClickAdd}>
            Add Item
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductComponent
              key={item.uuid}
              item={item}
              onEdit={(uuid: string) => handleEditProduct(uuid)}
              onDelete={(uuid: string) => handleDeleteProduct(uuid)}
            />
          ))}
        </div>
      </div>
      <Modal>
        <h3 className="font-bold text-lg">Perhatian!</h3>
        <p className="py-4">
          Apakah data {isDataDelete?.productName} tersebut akan dihapus?
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex justify-between space-x-5">
            <button className="btn btn-error" onClick={handleDelete}>
              Hapus
            </button>
            <button className="btn">Batal</button>
          </form>
        </div>
      </Modal>
    </>
  )
}
