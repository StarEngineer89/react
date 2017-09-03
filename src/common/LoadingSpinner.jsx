import React from 'react'
import {ImgAsset} from './index'

import './LoadingSpinner.scss'

export default class LoadingSpinner extends React.Component{
  render(){
    let {white, small} = this.props
    return (
      <div className={small ? "loading-spinner-small" : "loading-spinner"}>
          <ImgAsset src={white ? "/spin-white.svg" : "/spin.svg"} />
      </div>
    )
  }
}
