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
    <label className="input input-bordered flex justify-between items-center">
      <input
        type="text"
        className="grow w-full"
        placeholder="Search"
        onChange={(e) => onSearchInput(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70 cursor-pointer"
        onClick={handleSearch}
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  )
}
