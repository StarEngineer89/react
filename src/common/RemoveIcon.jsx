import React from 'react'

import './RemoveIcon.scss'
export default class RemoveIcon extends React.Component{
  render(){
    let {when, className, ...other} = this.props
    if(typeof when !== 'undefined' && !when){
      return null
    }

    className = className || 'remove-icon'

    return (
      <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" className={className} {...other}>
        <title>Artboard 30</title>
        <desc>Created with Sketch.</desc>
        <defs/>
        <g id="page" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
          <circle stroke="#B6B6B6" fill="#E6E6E6" cx="9.52699976" cy="9.52699976" r="8.97300024"/>
          <rect fill="#4C4C4C" transform="translate(9.500000, 10.073606) rotate(-45.000000) translate(-9.500000, -10.073606) " x="8.5" y="5.57360616" width="2" height="9"/>
          <rect fill="#4C4C4C" transform="translate(9.500000, 10.073606) rotate(45.000000) translate(-9.500000, -10.073606) " x="8.5" y="5.57360616" width="2" height="9"/>
        </g>
      </svg>
    )
  }
}

RemoveIcon.propTypes = {
  when: React.PropTypes.bool,
  onClick: React.PropTypes.func
}
