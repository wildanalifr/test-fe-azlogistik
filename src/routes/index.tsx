import { createBrowserRouter } from 'react-router-dom'
import ProductPage from '../page/ProductPage'
import ProductPageForm from '../page/ProductPageForm'
import PokePage from '../page/Poke'

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
  {
    path: '/poke',
    element: <PokePage />,
  },
])

export default router
