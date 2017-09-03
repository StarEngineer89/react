import React from 'react'

import './ShippingForm.scss'
import {i18n} from '../../../common'
import {Section, SectionTitle} from '../../../common/section'
import {FormControl, FormSelect, RowControl} from '../../../common/form'
import CountryField from './CountryField.jsx'

export default class ShippingForm extends React.Component{
  render(){
    let {name, title, model, onChange, countries} = this.props

    return (
      <form name={name} className="shipping-form">
        <SectionTitle>{title}</SectionTitle>

        <Section>

          <CountryField model={model}
                      name="country"
                      prompt={i18n.t('shipping-form.placeholder.country')}
                      onChange={onChange}
                      items={countries}
          />

          <RowControl onChange={onChange} model={model}>
            <FormControl model={model} key="street"
                         name="street"
                         placeholder={i18n.t('shipping-form.placeholder.street')}
            />

            <FormControl model={model} key="house"
                         name="house"
                         className="house"
                         placeholder={i18n.t('shipping-form.placeholder.house')}
            />
          </RowControl>

          <FormControl model={model}
                       name="additional"
                       placeholder={i18n.t('shipping-form.placeholder.additional')}
                       onChange={onChange}
          />

          <FormControl model={model}
                       name="postalCode"
                       placeholder={i18n.t('shipping-form.placeholder.postal-code')}
                       onChange={onChange}
          />

          <FormControl model={model}
                       name="city"
                       placeholder={i18n.t('shipping-form.placeholder.city')}
                       onChange={onChange}
          />

        </Section>
      </form>
    )
  }
}
