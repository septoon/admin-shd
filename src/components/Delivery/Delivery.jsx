import { BackButton } from '@twa-dev/sdk/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Delivery = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='w-3/5 dark:text-white'>Скоро тут появится админ панель раздела "Доставка"</h1>

      <BackButton onClick={() => navigate('/admin-shd')} />
    </div>
  )
}

export default Delivery