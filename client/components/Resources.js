import React from 'react'
import { connect } from 'react-redux'



/**
 * COMPONENT
 */
const Resources = (props) => {
    const { name, displayName, handleSubmit, error } = props
    return (
        <div className="resources">Resources</div>
    )
}
const mapState = state => {
    return {

    }
}

const mapDispatch = dispatch => {

}
export default connect(mapState, mapDispatch)(Resources)
