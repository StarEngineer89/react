import React from 'react'

import {i18n, Spree} from '../../../common'
import {Section, SectionTitle} from '../../../common/section'
import {PhoneControl} from '../../../common/form'

export default class PhoneBlock extends React.Component{

  render(){
    let { model, onChange, countries } = this.props
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <form name="phone" onSubmit={event => event.preventDefault() }>
        <SectionTitle>
          {i18n.t('phone-block.title')}
        </SectionTitle>

        <Section>

          <PhoneControl model={model}
                        countries={countries}
                        isUsa={isUsa}
                        onChange={onChange}
          />

        </Section>
      </form>
    )
  }
}

PhoneBlock.propTypes = {
  model: React.PropTypes.object,
  countries: React.PropTypes.array,
  onChange: React.PropTypes.func
}
