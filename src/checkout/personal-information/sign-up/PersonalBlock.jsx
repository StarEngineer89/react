import React from 'react'

import {i18n, Spree} from '../../../common'
import { Section, SectionTitle } from '../../../common/section'
import { FormControl, RowControl, BirthDayControl, PasswordControl, GenderControl } from '../../../common/form'

export default class PersonalBlock extends React.Component{
  renderNameBlock(model, onChange) {
    if (this.props.isMobile) {
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
    let {model, onChange, userLoggedIn, isMobile} = this.props
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <form name="signUp" key="signUp">

        <SectionTitle className="first">
          {i18n.t('personal-block.head')}
        </SectionTitle>

        <Section>

          <GenderControl model={model} name="gender" onChange={onChange} />

          {this.renderNameBlock(model, onChange)}

          {userLoggedIn ? null :
            <FormControl model={model}
                         name="email"
                         placeholder={i18n.t('personal-information.placeholder.email')}
                         onChange={onChange}
            />
          }

          <BirthDayControl model={model} onChange={onChange} isMobile={isMobile} isUsa={isUsa} />

          {userLoggedIn ? null :
            <PasswordControl model={model}
                             name="password"
                             placeholder={i18n.t('personal-information.placeholder.password')}
                             onChange={onChange}
            />
          }

        </Section>

      </form>
    )
  }
}
