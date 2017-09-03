import React from 'react'

import {i18n, ImgAsset} from '../../common'
import './SecureBlock.scss'

export default class SecureBlock extends React.Component{
  render(){
    return (
      <div className="secure-block">
        <div className="images">
          <ImgAsset src="/secure.svg" />
        </div>
        <div className="head">
          {i18n.t('secure-block.head')}
        </div>
        <div className="text">
          {i18n.t('secure-block.text')}
        </div>
      </div>
    )
  }
}
