import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortProduct } from '../redux/productSlice'

export default function UrutComponent() {
  const [urut, setUrut] = useState<string>('')
  const [detailUrut, setDetailUrut] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (urut !== '' && detailUrut !== '') {
      dispatch(sortProduct({ nameFilter: urut, tipeFilter: detailUrut }))
    }
  }, [urut, detailUrut])

  return (
    <div className="flex space-x-6 items-center">
      <details className="dropdown mr-1">
        <summary className="btn m-1">Urut berdasar</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a onClick={() => setUrut('harga')}>Harga</a>
          </li>
          <li>
            <a onClick={() => setUrut('stock')}>Stock</a>
          </li>
        </ul>
      </details>
      <p>{urut}</p>
      <details className="dropdown mr-1">
        <summary className="btn m-1">Urut berdasar</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a onClick={() => setDetailUrut('besar')}>Besar</a>
          </li>
          <li>
            <a onClick={() => setDetailUrut('kecil')}>Kecil</a>
          </li>
        </ul>
      </details>
      <p>{detailUrut}</p>
    </div>
  )
}
