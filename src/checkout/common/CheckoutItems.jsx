import React from 'react'

import './CheckoutItems.scss';
import {i18n, Spree} from '../../common'

export default class CheckoutItems extends React.Component {
  render(){
    const {items, subtotal} = this.props.order
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div className="checkout-items">
        <div className="head">
          {i18n.t('checkout-items.items')}
        </div>
        <div className="items">

          {items.map(item =>
            <div className="item" key={item.id}>
              <div className="image">
                <img src={item.img} />
              </div>
              <div className="details">
                <span className="name">{item.name}</span>
                <div className="row">
                  <span className="count">{item.amount}x</span>
                  <span className="price">{item.total + i18n.t('month')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="footer">
          <div className="left">
            <span>{i18n.t('checkout-items.total')}</span>
            {isUsa ? <span className="usa-tax">{i18n.t('checkout-summary-table.total.tax')}</span> : null}
          </div>
          <span className="right">{subtotal + i18n.t('month')}</span>
        </div>
      </div>
    )
  }
}

CheckoutItems.propTypes = {
  order: React.PropTypes.object
}
