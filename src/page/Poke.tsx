import { useEffect, useState } from 'react'

export default function PokePage() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.results?.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item?.name}</td>
                <td>{item?.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
