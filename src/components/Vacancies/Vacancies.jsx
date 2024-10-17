import { BackButton } from '@twa-dev/sdk/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Vacancies = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <h1 className='w-3/5 dark:text-white'>Скоро тут появится админ панель раздела "Вакансии"</h1>
      <BackButton onClick={() => navigate('/admin-shd')} />
    </div>
  )
}

export default Vacancies