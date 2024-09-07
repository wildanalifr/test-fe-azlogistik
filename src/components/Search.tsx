import { useState } from 'react'
import { searchProduct } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

export default function SearchComponent() {
  const [searchInput, onSearchInput] = useState<string>('')
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(searchProduct(searchInput))
  }

  return (
    <div className="flex">
      <input
        name="searchInput"
        type="text"
        placeholder="Search Here"
        className="input w-full max-w-xs underline"
        onChange={(e) => onSearchInput(e.target.value)}
      />
      <button className="btn" onClick={handleSearch}>
        Button
      </button>
    </div>
  )
}
