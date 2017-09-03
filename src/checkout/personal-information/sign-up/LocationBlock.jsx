import React from 'react'

import { Section, SectionTitle} from '../../../common/section'
import {i18n, Spree} from '../../../common'
import {LocationControl} from '../../../common/form'

export default class LocationBlock extends React.Component{
  render(){
    let {model, onChange} = this.props
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div>
        <SectionTitle>
          {i18n.t('location-block.title')}
        </SectionTitle>

        <Section>
          <LocationControl model={model}
                           placeholder={i18n.t('location-block.placeholder')}
                           address={isUsa ? i18n.t('location-block.address-us')
                                          : i18n.t('location-block.address')}
                           onChange={onChange}
          />

        </Section>
      </div>
    )
  }
}

LocationBlock.propTypes = {
  model: React.PropTypes.object,
  onChange: React.PropTypes.func
}
