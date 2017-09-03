import React from 'react'

export default class StepComponent extends React.Component{

  saveAndGo(data, url){
    this.props.updateState(data)

    setTimeout(
      () => this.redirect(url),
      0
    )
  }

  redirect(url){
    if(!this.context || url.indexOf('checkout') === -1){
      location.href = typeof url === 'string' ? url : url.pathname
    } else {
      this.context.router.push(url)
    }
  }
}

StepComponent.contextTypes = {
  router: React.PropTypes.object
}
