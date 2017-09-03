import React from 'react'

import './BBPayItem.scss'
import {ImgAsset, i18n} from '../../common'

export default class BBPayItem extends React.Component{
  render(){
    let item = this.props.order.items[0] || {}

    return (
      <div className="bb-pay-item">
        <div className="body">
          <img src={item.img} className="image" />

          <div className="wrapper">
            <p className="first">{item.name}</p>
            {item.artikul ? <p>{i18n.t('external.line.artikel.number')} {item.artikul}</p> : null}

            <p className="first">{i18n.t('external.line.payment.method')}</p>
            <p>{i18n.t('external.line.rent.with')}</p>

            <div className="bb-logo">
              <a href="/" target="_blank">
                <ImgAsset src="/logo.svg" className="logo" />
              </a>
              <div>{i18n.t('external.line.rent.instead')}</div>
            </div>

            <p className="secure">
              <ImgAsset src="/secure.svg" dir="checkout" />
              {i18n.t('external.line.for.sure')}
            </p>

          </div>
        </div>
      </div>
    )
  }
}
