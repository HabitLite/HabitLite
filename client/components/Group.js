import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


/**
 * COMPONENT
 */
const Group = (props) => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="group">Group Page</div>
  )
}    
const mapState = state => {
    return {
    
    }
}
      
const mapDispatch = dispatch => {
   
}   
export default connect(mapState, mapDispatch)(Group)
      