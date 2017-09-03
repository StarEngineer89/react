import React from 'react'

import {i18n} from '../../common'
import {FormControl, RowControl, BirthDayControl, PasswordControl, GenderControl } from '../../common/form'
import RootStore from '../stores/RootStore.js'

export default class PersonalBlock extends React.Component{
  constructor(props) {
    super(props)

    this.state = RootStore.getState()

    this.storeChanged = this.storeChanged.bind(this)
  }

  componentDidMount() {
    RootStore.listen(this.storeChanged)
  }

  componentWillUnmount() {
    RootStore.unlisten(this.storeChanged)
  }

  storeChanged(state) {
    this.setState(state)
  }

  renderNameBlock(model, onChange) {
    if (this.state.isMobile) {
      return (
        <div className="name-block">
          <FormControl model={model} key="firstName"
                       name="firstName"
                       placeholder={i18n.t('personal-information.placeholder.first-name')}
                       onChange={onChange}
          />

          <FormControl model={model} key="lastName"
                       name="lastName"
                       className="last-name"
                       placeholder={i18n.t('personal-information.placeholder.last-name')}
                       onChange={onChange}
          />
        </div>
      )
    } else {
      return (
        <RowControl onChange={onChange} model={model}>
          <FormControl model={model} key="firstName"
                       name="firstName"
                       placeholder={i18n.t('personal-information.placeholder.first-name')}
          />

          <FormControl model={model} key="lastName"
                       name="lastName"
                       className="last-name"
                       placeholder={i18n.t('personal-information.placeholder.last-name')}
          />
        </RowControl>
      )
    }
  }

  render(){
    let {model, onChange} = this.props
    let {isMobile} = this.state

    return (
      <div>
        <GenderControl model={model} name="gender" onChange={onChange} />

        {this.renderNameBlock(model, onChange)}

        <FormControl model={model}
                     name="email"
                     placeholder={i18n.t('personal-information.placeholder.email')}
                     onChange={onChange}
        />

        <BirthDayControl model={model} onChange={onChange} isMobile={isMobile} />

        <PasswordControl model={model}
                         name="password"
                         placeholder={i18n.t('personal-information.placeholder.password')}
                         onChange={onChange}
        />

      </div>
    )
  }
}

PersonalBlock.propTypes = {
  model: React.PropTypes.object,
  onChange: React.PropTypes.func
}
