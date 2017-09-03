import React from 'react'

import  './MobileHeader.scss'
import {i18n} from '../../common'

export default class MobileHeader extends React.Component {
  onClick(index){
    return ()=>{
      if(index >= this.props.activeTab){
        return;
      }

      var url = ''
      if(index === 0){
        url = '/checkout/plan'
      } else if(index === 1){
        url = '/checkout/personal-information'
      }
      if(url){
        this.context.router.push(url)
      }
    }
  }
  render(){
    let { activeTab } = this.props
    let steps = [i18n.t('navigation.plan'), i18n.t('navigation.personal'), i18n.t('navigation.payment')]
      .map((str, index) => {
        return {
          name: str,
          index: index,
          className: (index === activeTab ? 'active' : '') + (index <= activeTab ? ' link' : '')
        }
      })

    return (
      <div>
        <div className="mobile-total-price">
          <div className="text">{i18n.t('navigation.header')}</div>
          <div className="price"> {this.props.price + i18n.t('month')}</div>
        </div>
        <div className="mobile-navigation">
          {steps.map(step =>
            <div key={step.index} className={step.className} onClick={this.onClick(step.index)}>
              <span className="index">{step.index + 1}</span>
              <span className="name">{step.name}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

MobileHeader.contextTypes = {
  router : React.PropTypes.object
}

MobileHeader.propTypes = {
  activeTab: React.PropTypes.number,
  price: React.PropTypes.string
}
