import React from 'react'
import './loader.css'
import './ImageLoader.css'

const Loader = ({imageLoader}) => {

  return (
    <div className={`w-full h-full ${imageLoader ? '' : 'pt-[40%]'} flex justify-center items-center`}>
      <div className={imageLoader ? "imageLoader" : "loader"}></div>
    </div>
  )
}

export default Loader