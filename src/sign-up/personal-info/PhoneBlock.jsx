import React from 'react'

import {i18n, Spree} from '../../common'
import {Section, SectionTitle} from '../../common/section'
import {PhoneControl} from '../../common/form'
import SignUpActions from '../actions/SignUpActions.js'
import RootStore from '../stores/RootStore.js'

export default class PhoneBlock extends React.Component{
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

  onChange(event, name){
    SignUpActions.updateFormValue(event, name)
  }

  render(){
    let {countries} = this.state
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <form name="phone" onSubmit={event => event.preventDefault() }>
        <SectionTitle>
          {i18n.t('phone-block.title')}
        </SectionTitle>

        <Section className="sign-up">

          <PhoneControl model={this.props.model}
                        countries={countries}
                        isUsa={isUsa}
                        onChange={this.onChange}
          />

        </Section>
      </form>
    )
  }
}

PhoneBlock.propTypes = {
  model: React.PropTypes.object
}
