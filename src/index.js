import React, { Component, PropTypes } from 'react'
import { UniqueId } from 'sendit-utility'
import './style.css'
export default class SenditInput extends Component {
  constructor() {
    super()
    this.state = {
      inputClass: '',
      uniqueId: null
    }
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }
  componentDidMount () {
    this.inputClassFunc()
    this.setState({uniqueId: UniqueId(6)})
  }
  onChange (e) {
    const { onChange } = this.props
    onChange(e)
    setTimeout(()=>{
      this.inputClassFunc()
    }, 0)
  }
  onKeyPress (e) {
    const { onKeyPress, onEnter } = this.props
    onKeyPress && onKeyPress(e)
    if ( e.key === 'Enter' ) {
      console.log('onEnter')
      onEnter && onEnter(e)
    }
  }
  inputClassFunc () {
    const { value, type, placeholder, minLength, maxLength } = this.props
    const { inputClass } = this.state

    let inputClassList = ''
    if (type==='textarea') inputClassList += ' __textarea'
    if (placeholder) inputClassList += ' hasTooltip'
    if (!value || value.length == 0) inputClassList += ' isEmpty'

    this.setState({inputClass: inputClassList})
  }
  render() {
    const { label, value, type, placeholder, minLength, maxLength, rows, onFocus, onBlur, onChange, onKeyPress, disabled } = this.props
    const { values, inputClass, uniqueId } = this.state
    // console.log('inputClass', inputClass)
    return (
      <div className={'SenditInput' + inputClass}>
        {(type==='textarea')?<textarea id={uniqueId} className={'textarea'} value={value || ''} minLength={minLength} maxLength={maxLength} onFocus={onFocus} onBlur={onBlur} onChange={this.onChange} onKeyPress={this.onKeyPress} rows={rows} disabled={disabled}></textarea>:<input id={uniqueId} className={'input'} type={type || 'text'} minLength={minLength} maxLength={maxLength} value={value || ''} onFocus={onFocus} onBlur={onBlur} onChange={this.onChange} onKeyPress={this.onKeyPress} disabled={disabled} />}
        <label htmlFor={uniqueId} className={'label'}>{label}</label>
        {placeholder?<span className={'tooltip'}>{placeholder}</span>:''}
      </div>
    )
  }
}
SenditInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  onEnter: PropTypes.func
}
SenditInput.defaultProps = {
  type: 'text',
  minLength: 0,
  maxLength: 255,
  rows: 3
}