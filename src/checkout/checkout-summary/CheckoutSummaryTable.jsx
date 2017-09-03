import React from 'react'

import './CheckoutSummaryTable.scss'
import { i18n, RemoveIcon, Spree } from '../../common'

export default class CheckoutSummaryTable extends React.Component {

  changeAmount(item){
    let timeout = null
    return (event)=>{
      let amount = parseInt(event.target.value || 0) || 0
      if(amount) {
        clearTimeout(timeout)
        timeout = setTimeout(
          () => this.props.changeAmount(item.id, amount),
          100
        )
      }
    }
  }
  removeItem(item){
    return () => this.props.removeItem(item.id)
  }

  renderTableRowDesktop(item, showRemoveBtn, showInput) {
    return (
      <div className="item-row" key={item.id}>
        <div className="column-one">

          <div className="image"><img src={item.img} /></div>

          <span className="label">{item.name}</span>
        </div>
        <div className="column-two">
          {item.price + i18n.t('month')}
        </div>
        <div className="column-three">
          {showInput ?
          <input type="number" min="1" max="100" step="1" defaultValue={item.amount}
                 onChange={this.changeAmount(item)}

          />
            : item.amount}
        </div>
        <div className="column-four">
          {item.total + i18n.t('month')}
          <RemoveIcon when={showRemoveBtn} onClick={this.removeItem(item)} />
        </div>
      </div>
    )
  }

  renderTableRow() {
    let showRemoveBtn = !!this.props.removeItem
    let showInput = !!this.props.changeAmount

    return (
      <div>
        {this.props.order.items.map(item =>
          this.renderTableRowDesktop(item, showRemoveBtn, showInput)
        )}
      </div>
    )
  }

  renderTableSummary() {
    let order = this.props.order
    let paymentSummary = this.props.paymentSummary ? this.props.paymentSummary : null
    let isUsa = Spree.getShopName() === 'usa'
    let showAdjustment = !paymentSummary || order.adjustment.indexOf('0.00') === -1

    return (
      <div className="item-row last-row">
        <div className="column-one">

        </div>
        <div className="column-total">
          <p>{i18n.t('checkout-summary-table.subtotal')} <span>{order.subtotal + i18n.t('month')}</span></p>
          <p>{i18n.t('checkout-summary-table.shipping')} <span>{order.shipping}</span></p>
          {paymentSummary && isUsa
            ? <p>{i18n.t('checkout-summary-table.sales-tax')} <span>{order.usSalesTax}</span></p>
            : null}
          {!showAdjustment ? null:
            <p>{i18n.t('checkout-summary-table.adjustment')} <span>{order.adjustment}</span></p>
          }
          <p className="last">
            {i18n.t('checkout-summary-table.total')}
            {!paymentSummary && isUsa ? <span className="no-tax">{i18n.t('checkout-summary-table.total.tax')}</span> : null}
            <span>{order.total}</span>
          </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='bd-items'>
        <div className="items-head">
          <div className="column-one">
            <p>{i18n.t('checkout-summary-table.items')}</p>
          </div>
          <div className="column-two">
            <p>{i18n.t('checkout-summary-table.price')}</p>
          </div>
          <div className="column-three">
            <p>{i18n.t('checkout-summary-table.amount')}</p>
          </div>
          <div className="column-four">
            <p>{i18n.t('checkout-summary-table.total-price')}</p>
          </div>
        </div>

        {this.renderTableRow()}
        {this.renderTableSummary()}

      </div>
    )
  }
}

CheckoutSummaryTable.propTypes = {
  order: React.PropTypes.object.isRequired,
  changeAmount: React.PropTypes.func,
  removeItem: React.PropTypes.func,
  paymentSummary: React.PropTypes.bool
}
