import { createSlice } from '@reduxjs/toolkit'
import { tProduct } from '../types/Product'

const initialState: {
  products: tProduct[]
  product: tProduct | null
  //   isSearch: boolean
  //   searchProducts: tProduct[]
} = {
  products: [
    {
      uuid: '1',
      productName: 'team1',
      productPrice: '20000',
      productStock: '20',
    },
    {
      uuid: '2',
      productName: 'team2',
      productPrice: '100000',
      productStock: '1000',
    },
    {
      uuid: '3',
      productName: 'team3',
      productPrice: '90000',
      productStock: '10',
    },
  ],
  product: null,
  //   isSearch,
  //   searchProducts,
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productName, productPrice, productStock } = action.payload
      state.products.push({
        uuid: new Date().getUTCMilliseconds().toString(),
        productName,
        productPrice,
        productStock,
      })
      localStorage.setItem('datas', JSON.stringify(state.products))
    },
    editProduct: (state, action) => {
      const { uuid, productName, productPrice, productStock } = action.payload
      state.products = state.products.map((item) => ({
        ...item,
        productName: item?.uuid === uuid ? productName : item.productName,
        productPrice: item?.uuid === uuid ? productPrice : item.productPrice,
        productStock: item?.uuid === uuid ? productStock : item.productStock,
      }))
      localStorage.setItem('datas', JSON.stringify(state.products))
    },
    getProduct: (state, action) => {
      const uuid = action.payload
      const filteredProduct = state.products.filter(
        (item) => item?.uuid === uuid
      )
      state.product = filteredProduct[0]
    },
    deleteProduct: (state, action) => {
      const uuid = action.payload
      state.products = state.products.filter((item) => item?.uuid !== uuid)
      localStorage.setItem('datas', JSON.stringify(state.products))
    },

    searchProduct: (state, action) => {
      const searchInput = action.payload

      const filteredProduct = state.products.some(
        (item) =>
          item?.productName
            .toLowerCase()
            .includes(searchInput?.toLowerCase()) ||
          item?.productPrice.includes(searchInput?.toLowerCase())
      )
      state.products =
        searchInput !== ''
          ? filteredProduct
          : JSON.parse(localStorage.getItem('datas')!)
    },

    sortProduct: (state, action) => {
      const { nameFilter, tipeFilter } = action.payload
      if (nameFilter === 'harga') {
        if (tipeFilter === 'kecil') {
          state.products = state.products.sort((a, b) =>
            a.productPrice < b.productPrice ? 1 : -1
          )
        } else {
          state.products = state.products.sort((a, b) =>
            a.productPrice > b.productPrice ? 1 : -1
          )
        }
      } else if (nameFilter === 'stock') {
        if (tipeFilter === 'kecil') {
          state.products = state.products.sort((a, b) =>
            a.productStock > b.productStock ? 1 : -1
          )
        } else {
          state.products = state.products.sort((a, b) =>
            a.productStock < b.productStock ? 1 : -1
          )
        }
      }
    },
  },
})

export const {
  addProduct,
  getProduct,
  editProduct,
  searchProduct,
  deleteProduct,
  sortProduct,
} = productSlice.actions

export default productSlice.reducer
