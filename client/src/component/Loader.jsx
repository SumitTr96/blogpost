import React from 'react'
import LoadingGif from './loading.gif'

const Loader = () => {
  return(
    <div className="loader">
        <div className="loader_image">
            <img src={LoadingGif} alt="GifLoading" />
        </div>
    </div>
  )
}

export default Loader