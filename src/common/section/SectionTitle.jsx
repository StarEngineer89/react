import React from 'react'

import './SectionTitle.scss'
import { ImgAsset } from '../../common'

export default class SectionTitle extends React.Component{
  render(){
    let { className, children } = this.props
    className = 'section-title ' + (className ? className : '')

    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

SectionTitle.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}
