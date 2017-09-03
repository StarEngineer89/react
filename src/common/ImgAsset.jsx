import React from 'react'

export default class ImgAsset extends React.Component{
  render(){
    let {src, when, dir, ...other} = this.props
    if(typeof when !== "undefined" && !when){
      return null
    }

    dir = dir || 'common'

    src = `/${dir}/images${src}`
    return (
      <img src={src} {...other} />
    )
  }
}
