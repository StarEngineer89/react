import React from 'react'

import './Section.scss'

export default class Section extends React.Component{
  render(){
    let { className, children, long } = this.props
    className = 'sbb-section ' + (className ? className: '') + (long ? ' long': '')
    return (
      <div className={className}>
        {children}
      </div>
    )
  }
}

Section.propTypes = {
  long: React.PropTypes.bool,
  className: React.PropTypes.string,
  children: React.PropTypes.node
}
