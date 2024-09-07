import { createBrowserRouter } from 'react-router-dom'
import ProductPage from '../page/ProductPage'
import ProductPageForm from '../page/ProductPageForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductPage />,
  },
  {
    path: '/create',
    element: <ProductPageForm />,
  },
  {
    path: '/edit/:uuid',
    element: <ProductPageForm />,
  },
])

export default router
