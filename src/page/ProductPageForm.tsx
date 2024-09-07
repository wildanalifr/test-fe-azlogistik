import { useLocation, useParams } from 'react-router-dom'
import ProductForm from '../sections/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/productSlice'
import { useEffect } from 'react'
import { RootState } from '../redux/store'

export default function ProductPageForm() {
  const { uuid } = useParams()
  const location = useLocation()

  const dispatch = useDispatch()

  const isEdit = location.pathname.includes('edit')

  useEffect(() => {
    if (uuid) {
      dispatch(getProduct(uuid))
    }
  }, [uuid])

  const products = useSelector((state: RootState) => state.product.product)

  if (isEdit && products) {
    return <ProductForm isEdit={isEdit} productEdit={products} />
  } else {
    return <ProductForm isEdit={isEdit} productEdit={null} />
  }
}
