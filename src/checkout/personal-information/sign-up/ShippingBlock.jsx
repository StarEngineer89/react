import React from 'react'

import {i18n} from '../../../common'
import {Section} from '../../../common/section'
import ShippingForm from './ShippingForm.jsx'

export default class ShippingBlock extends React.Component{
  render(){
    return (
      <div>
        {this.renderCheckbox()}

        {this.renderForm()}
      </div>
    )
  }

  renderCheckbox(){
    let {model, onChangeCheckbox} = this.props

    let updateCheckBox = event => onChangeCheckbox({ shippingSame: event.target.checked })

    return (
      <Section>

        <label className="radio-shipping-address">
          <input type="checkbox" checked={model.shippingSame}  onChange={updateCheckBox}/>
          {i18n.t('payment.use-my-address')}
          <span className="dark">{i18n.t('payment.shipping-info')}</span>
        </label>

      </Section>
    )
  }

  renderForm(){
    let {model, onChange, countries} = this.props

    if(model.shippingSame){
      return null
    }
    let data = {
      countries,
      title: i18n.t('payment.title.shipping-info'),
      name: "shippingInfo",
      model: model.shippingInfo,
      onChange
    }
    return <ShippingForm {...data} />
  }
}
