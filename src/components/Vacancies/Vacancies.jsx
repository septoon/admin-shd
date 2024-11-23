import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Vacancies = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.BackButton.onClick(() => navigate('/admin-shd'))
    return () => {
      window.Telegram.WebApp.BackButton.hide()
    }
  }, [navigate])
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <h1 className='w-3/5 dark:text-white'>Скоро тут появится админ панель раздела "Вакансии"</h1>
    </div>
  )
}

export default Vacancies