import { BackButton } from '@twa-dev/sdk/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contacts = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Contacts</h1>
      <BackButton onClick={() => navigate('/')} />
    </div>
  )
}

export default Contacts