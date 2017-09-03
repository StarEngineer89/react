import React from 'react'

import ShippingForm from '../personal-information/ShippingForm.jsx'
import {Section} from '../../common/section'
import {i18n} from '../../common'

export default class BillingAddressBlock extends React.Component{

  render(){

    let {model, onChangeCheckbox} = this.props

    let updateCheckBox = (event) => {
      onChangeCheckbox(event, 'billingSame')
    }

    return (
      <div>
        <Section>

          <label className="radio-shipping-address">
            <input type="checkbox" checked={model.billingSame}  onChange={updateCheckBox}/>
            {i18n.t('payment.use-my-address')}
            <span className="dark">{i18n.t('payment.billing-info')}</span>
          </label>

        </Section>

        {this.renderForm()}
      </div>
    )
  }

  renderForm(){
    let {model, onChange, countries} = this.props

    if(model.billingSame){
      return null
    }
    let data = {
      countries,
      title: i18n.t('payment.title.billing-info'),
      name: "billingInfo",
      model: model.billingInfo,
      onChange
    }
    return <ShippingForm {...data} />
  }
}
