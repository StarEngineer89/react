import React from 'react'

import './CountryField.scss'
import {i18n} from '../../../common'
import {FormSelect} from '../../../common/form'

export default class CountryField extends React.Component{

  render(){
    return (
      <div className="country-field">
        <span className="label">{i18n.t('country-field.ship-to')}</span>
        <FormSelect {...this.props} />
      </div>
    )
  }
}
