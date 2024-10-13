import { BackButton } from '@twa-dev/sdk/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Delivery = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Доставка</h1>
      <BackButton onClick={() => navigate('/')} />
    </div>
  )
}

export default Delivery