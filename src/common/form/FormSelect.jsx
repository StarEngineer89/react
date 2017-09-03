import React from 'react'

import './FormSelect.scss'

export default class FormSelect extends React.Component{
  onChange(event){
    let {onChange, name} = this.props
    onChange(event, name)
  }
  render(){
    let { model, name, prompt, items, className, onBlur } = this.props
    className = "form-select " + (className ? className: '')
    let value = model[name]

    return (
      <div className={className}>
        <select value={value}
                onChange={this.onChange.bind(this)}
                onBlur={onBlur}
        >
          <option value="" key="00">{prompt}</option>
          {items.map(item =>
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>
      </div>
    )
  }
}

FormSelect.propTypes = {
  model: React.PropTypes.object,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  prompt: React.PropTypes.string,
  className: React.PropTypes.string,
  items: React.PropTypes.array
}
