import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { tProduct, tProductInput } from '../types/Product'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct, editProduct } from '../redux/productSlice'
import { useEffect, useMemo } from 'react'

const schema = yup.object({
  productName: yup.string().required('*Wajib'),
  productPrice: yup.string().required('*Wajib'),
  productStock: yup.string().required('*Wajib'),
})

type Props = {
  isEdit: boolean
  productEdit: tProduct | null
}

export default function ProductForm({ isEdit, productEdit }: Props) {
  const defaultValues = useMemo(
    () => ({
      productName: (isEdit && productEdit?.productName) || '',
      productPrice: (isEdit && productEdit?.productPrice) || '',
      productStock: (isEdit && productEdit?.productStock) || '',
    }),
    [isEdit, productEdit]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  console.log('error', errors)

  useEffect(() => {
    if (isEdit) {
      reset(defaultValues)
    }
  }, [isEdit])

  const dispatch = useDispatch()

  const onSubmit = (data: tProductInput) => {
    const payload = data
    console.log('payload', payload)

    if (isEdit) {
      dispatch(
        editProduct({
          ...payload,
          uuid: productEdit?.uuid,
        })
      )
      alert('berhasil add')
      navigate('/')
    } else {
      dispatch(addProduct(payload))
      alert('berhasil add')
      navigate('/')
    }
  }

  const navigate = useNavigate()

  const handleBackNavigate = () => {
    navigate('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card mx-auto p-5 space-y-4 max-w-full lg:max-w-4xl"
    >
      <div className="flex justify-between">
        <h3>Form Input</h3>
        <button type="submit" onClick={handleBackNavigate}>
          Back
        </button>
      </div>

      <label className="input input-bordered flex items-center gap-2">
        Name
        <input
          {...register('productName')}
          type="text"
          className="grow"
          placeholder="Input here"
        />
        {errors.productName && (
          <p className="text-red-500">{errors.productName.message}</p>
        )}
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Price Rp.
        <input
          {...register('productPrice')}
          type="text"
          className="grow"
          placeholder="Price number"
        />
        {errors.productPrice && (
          <p className="text-red-500">{errors.productPrice.message}</p>
        )}
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Stock
        <input
          {...register('productStock')}
          type="number"
          className="grow"
          placeholder="number"
        />
        {errors.productStock && (
          <p className="text-red-500">{errors.productStock.message}</p>
        )}
      </label>
      <button type="submit" className="btn btn-primary">
        {isEdit ? 'Edit' : 'Add'}
      </button>
    </form>
  )
}
