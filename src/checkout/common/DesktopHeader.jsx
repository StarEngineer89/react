import React from 'react'

import PageTitle from './PageTitle.jsx'
import CheckoutNavigation from './CheckoutNavigation.jsx';

export default class DesktopHeader extends React.Component {
  render(){
    let { pageName, ...other} = this.props
    return (
      <PageTitle title={pageName} className="content page-title">
        <CheckoutNavigation {...other} />
      </PageTitle>
    )
  }
}

DesktopHeader.propTypes = {
  pageName: React.PropTypes.string
}
