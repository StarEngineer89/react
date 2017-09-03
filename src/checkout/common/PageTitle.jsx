import React from 'react'

import './PageTitle.scss'

export default class PageTitle extends React.Component {
  render(){
    let {before, title, children, className} = this.props

    className = className || 'page-title'

    return (
      <div className={className}>
        {before}
        <h1>{title}</h1>
        {children}
      </div>
    )
  }
}

PageTitle.propTypes = {
  before: React.PropTypes.node,
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string
}
