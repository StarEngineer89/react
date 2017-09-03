import React from 'react'

import './CheckoutSummaryTableMobile.scss'
import { i18n, RemoveIcon, Spree } from '../../common'

export default class SummaryTableMobile extends React.Component{

  removeItem(item){
    return () => this.props.removeItem(item.id)
  }

  incrementItem(item){
    return ()=>{
      this.props.changeAmount(item.id, item.amount + 1)
    }
  }

  decrementItem(item){
    return ()=>{
      if(item.amount > 1) {
        this.props.changeAmount(item.id, item.amount - 1)
      }
    }
  }

  render(){
    const {items, shipping, subtotal, total, adjustment} = this.props.order

    let showAdjustment = adjustment.split(' ')[0] !== '0.00'
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div className="checkout-summary-table-mobile">
        {items.map(item =>
          <div className="item" key={item.id}>
            <div className="left">
              <div className="image">
                <img src={item.img} />
              </div>
            </div>
            <div className="right">
              <div className="remove">
                <RemoveIcon onClick={this.removeItem(item)} />
              </div>
              <div className="name">{item.name}</div>
              {/*<div className="prefix">
                {i18n.t('checkout-summary-table-mobile.monthly')}
              </div>*/}
              <div className="price">
                {item.total + i18n.t('month')}
              </div>
              <div className="postfix">
                {i18n.t('checkout-summary-table-mobile.inkl')}
              </div>
              <div className="amount">
                <button onClick={this.decrementItem(item)}>-</button>
                <input type="text" min="1" max="100" step="1" value={item.amount}
                        disabled
                />
                <button onClick={this.incrementItem(item)}>+</button>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="label">{i18n.t('checkout-summary-table.subtotal')}</div>
          <div className="price">{subtotal + i18n.t('month')}</div>
        </div>

        <div className="row">
          <div className="label">{i18n.t('checkout-summary-table.shipping')}</div>
          <div className="price">{shipping}</div>
        </div>

        {!showAdjustment ? null:
          <div className="row">
            <div className="label">{i18n.t('checkout-summary-table.adjustment')}</div>
            <div className="price">{adjustment}</div>
          </div>
        }

        <div className="row total">
          <div className="label">
            {i18n.t('checkout-summary-table.total')}
            {isUsa ? <span className="no-tax">{i18n.t('checkout-summary-table.total.tax')}</span> : null}
          </div>
          <div className="price">
            {total + i18n.t('month')}
            <div className="postfix">{i18n.t('checkout-summary-table-mobile.inkl')}</div>
          </div>
        </div>

      </div>
    )
  }
}

SummaryTableMobile.propTypes = {
  order: React.PropTypes.object.isRequired,
  changeAmount: React.PropTypes.func,
  removeItem: React.PropTypes.func
}
