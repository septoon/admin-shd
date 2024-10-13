import { BackButton } from '@twa-dev/sdk/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Vacancies = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Vacancies</h1>
      <BackButton onClick={() => navigate('/')} />
    </div>
  )
}

export default Vacancies