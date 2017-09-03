import React from 'react'

import {i18n, Spree} from '../../common'
import './SummaryMobile.scss'

export default class SummaryMobile extends React.Component {
  render(){
    let { items, subtotal, total, shipping, adjustment, usSalesTax } = this.props.order

    let showAdjustment = adjustment.split(' ')[0] !== '0.00'
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div className="summary-mobile">
        {items.map(item =>
          <div className="item">
            <div className="row">
              <div className="image"><img src={item.img} /></div>
              <div className="name">{item.name}</div>
            </div>
            <div className="line">
              <div className="left">{i18n.t('checkout-summary-table.amount')}</div>
              <div className="right">{item.amount}</div>
            </div>
            <div className="line">
              <div className="left">{i18n.t('checkout-summary-table.price')}</div>
              <div className="right">{item.price + i18n.t('month')}</div>
            </div>
            <div className="line">
              <div className="left">{i18n.t('checkout-summary-table.total-price')}</div>
              <div className="right">{item.total + i18n.t('month')}</div>
            </div>
          </div>
        )}
        <div className="total-line">
          <div className="left">
            {i18n.t('checkout-summary-table.subtotal')}
          </div>
          <div className="right">{subtotal + i18n.t('month')}</div>
        </div>
        <div className="total-line">
          <div className="left">{i18n.t('checkout-summary-table.shipping')}</div>
          <div className="right">{shipping}</div>
        </div>
        {isUsa
          ? <div className="row">
              <div className="label">{i18n.t('checkout-summary-table.sales-tax')}</div>
              <div className="price">{usSalesTax}</div>
            </div>
          : null}
        {!showAdjustment ? null :
          <div className="total-line">
            <div className="left">{i18n.t('checkout-summary-table.adjustment')}</div>
            <div className="right">{adjustment}</div>
          </div>
        }
        <div className="total-line last">
          <div className="left">{i18n.t('checkout-summary-table.total')}</div>
          <div className="right">
            {total + i18n.t('month')}
            <span className="hint">{i18n.t('checkout-summary-table-mobile.inkl')}</span>
          </div>
        </div>
      </div>
    )
  }
}

SummaryMobile.propTypes = {
  order: React.PropTypes.object
}
