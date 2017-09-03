import React from 'react'

import './GenderControl.scss'
import i18n from '../utils/localization'

export default class GenderControl extends React.Component{
  render(){
    let {model, name, onChange} = this.props

    let isMale = model[name] === 'm'
    let isFemale = model[name] === 'f'

    let updateRadio = (event) => onChange(event, name)

    return (
      <div className="gender-control">
        <label>
          <input type="radio" name={name} value="m"
                 checked={isMale}
                 onChange={updateRadio}
          /> {i18n.t('gender-control.mr')}
        </label>
        <label>
          <input type="radio" name={name} value="f"
                 checked={isFemale}
                 onChange={updateRadio}
          /> {i18n.t('gender-control.ms')}
        </label>
      </div>
    )
  }
}
