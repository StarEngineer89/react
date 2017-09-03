import React from 'react'

import './CheckoutNavigation.scss'
import {i18n} from '../../common'

export default class CheckoutNavigation extends React.Component {
  render(){
    let {activeTab, className } = this.props;
    className = "checkout-navigation " + (className || "")
    let texts = [`1. ${i18n.t('navigation.plan')}`, `2. ${i18n.t('navigation.personal')}`, `3. ${i18n.t('navigation.payment')}`]

    texts = texts.map((text, index) => {
      return {
        text,
        className: 'line ' + (index <= activeTab ? 'active' : ''),
        key: index
      }
    })

    return (
      <div className={className}>
        {texts.map(item =>
          <div className="item" key={item.key}>
            {item.text}
            <div className={item.className}></div>
          </div>
        )}
      </div>
    )
  }
}

CheckoutNavigation.propTypes = {
  activeTab: React.PropTypes.number,
  className: React.PropTypes.string
}
