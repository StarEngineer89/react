import React from 'react'

import './BirthDayControl.scss'
import FormSelect from './FormSelect.jsx'
import FormError from './FormError.jsx'
import Validation from '../utils/validation.jsx'
import i18n from '../utils/localization'

function getMonths(isMobile){
  let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  let pattern = isMobile ? 'month.' : 'month.long.'
  return months.map((str, index) => {
    return {
      id: '' + (index + 1),
      name: i18n.t(pattern + str)
    }
  })
}

let days = []
for(let i=1; i<32; i++){
  days.push({
    id: '' + i,
    name: '' + i
  })
}

let years = []
for(let i=new Date().getFullYear(); i>1920; i--){
  years.push({
    id: '' + i,
    name: '' + i
  })
}

export default class BirthDayControl extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      showError: false
    }
  }
  onBlur(event){
    if(event.relatedTarget){
      let target = event.relatedTarget.parentNode
      if(['month', 'day', 'year'].indexOf(target.classList[1]) > -1){
        return
      }
    }
    this.setState({
      showError: !!this.getErrorText()
    })
  }
  onChange(event, name){
    this.props.onChange(event, name)
    this.setState({
      showError: this.state.showError && !!this.getErrorText(name, event.target.value)
    })
  }

  getErrorText(name, value){
    let {model} = this.props
    let values = {
      birthMonth: model.birthMonth,
      birthDay: model.birthDay,
      birthYear: model.birthYear
    }

    if(name) {
      values[name] = value
    }

    return Validation.checkModelList(values)
  }

  renderErrorText(){
    if(!this.state.showError){
      return
    }

    return this.getErrorText()
  }

  render(){
    let {model, onChange, isMobile, isUsa} = this.props
    let onBlur = this.onBlur.bind(this)

    return (
      <div className="birth-day-control">

        <FormError text={this.renderErrorText()} />

        {isUsa
          ? <div className="row">
              <FormSelect model={model}
                          className="month"
                          name="birthMonth"
                          prompt={i18n.t('birth-day-control.month')}
                          onChange={onChange}
                          items={getMonths(isMobile)}
                          onBlur={onBlur}
              />
              <FormSelect model={model}
                          className="day"
                          name="birthDay"
                          prompt={i18n.t('birth-day-control.day')}
                          onChange={onChange}
                          items={days}
                          onBlur={onBlur}
              />
              <FormSelect model={model}
                          className="year"
                          name="birthYear"
                          prompt={i18n.t('birth-day-control.year')}
                          onChange={onChange}
                          items={years}
                          onBlur={onBlur}
              />
          </div>
          : <div className="row">
              <FormSelect model={model}
                          className="day"
                          name="birthDay"
                          prompt={i18n.t('birth-day-control.day')}
                          onChange={onChange}
                          items={days}
                          onBlur={onBlur}
              />
              <FormSelect model={model}
                          className="month"
                          name="birthMonth"
                          prompt={i18n.t('birth-day-control.month')}
                          onChange={onChange}
                          items={getMonths(isMobile)}
                          onBlur={onBlur}
              />
              <FormSelect model={model}
                          className="year"
                          name="birthYear"
                          prompt={i18n.t('birth-day-control.year')}
                          onChange={onChange}
                          items={years}
                          onBlur={onBlur}
              />
          </div>}
      </div>
    )
  }
}

BirthDayControl.propTypes ={
  model: React.PropTypes.object,
  name: React.PropTypes.string,
  isMobile: React.PropTypes.bool,
  onChange: React.PropTypes.func
}
