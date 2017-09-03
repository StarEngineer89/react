import React from 'react'

import {Section, SectionTitle} from '../../common/section'
import {i18n, Spree} from '../../common'
import {LocationControl} from '../../common/form'
import SignUpActions from '../actions/SignUpActions.js'

export default class LocationBlock extends React.Component{
  onChange(location) {
    SignUpActions.locationChange(location)
  }

  render(){
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div>
        <SectionTitle>
          {i18n.t('location-block.title')}
        </SectionTitle>

        <Section className="sign-up">
          <LocationControl model={this.props.model}
                           placeholder={i18n.t('location-block.placeholder')}
                           address={isUsa ? i18n.t('location-block.address-us')
                                          : i18n.t('location-block.address')}
                           onChange={this.onChange}
          />

        </Section>
      </div>
    )
  }
}

LocationBlock.propTypes = {
  model: React.PropTypes.object
}
