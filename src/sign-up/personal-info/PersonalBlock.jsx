import React from 'react'

import {i18n} from '../../common'
import { Section, SectionTitle } from '../../common/section'
import PersonalForm from './PersonalForm.jsx'
import SignUpActions from '../actions/SignUpActions.js'

export default class PersonalBlock extends React.Component{
  onChange(event, name){
    SignUpActions.updateFormValue(event, name)
  }

  render(){
    return (
      <form name="signUp" key="signUp">

        <SectionTitle className="first">
          {i18n.t('personal-block.head')}
        </SectionTitle>

        <Section className="sign-up">

          <PersonalForm model={this.props.model} onChange={this.onChange} />

        </Section>

      </form>
    )
  }
}

PersonalBlock.propTypes = {
  model: React.PropTypes.object
}
