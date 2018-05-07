import React, { Component } from 'react';
import {connect} from 'react-redux'

/**
 * COMPONENT
 */


class Habits extends Component{
    constructor(props) {
        super(props);
    }
    // componentDidMount(){
    //     // this.props.getAllBrands();
    // }

    render() {
        return (
            <div className="habits-list">
               <label className="habits-label">My Habits</label>
                <ul>
                    <li><input type="checkbox" className="check"/><p>checkbox 1</p></li>
                    <li><input type="checkbox" className="check"/><p>checkbox 2</p></li>
                    <li><input type="checkbox" className="check"/><p>checkbox 3</p></li>
                </ul>        
            </div>
        )
    }    
}

export default connect(null,null)(Habits);
{/* <ul>
                    <li><input type="checkbox"> checkbox 1</input></li>
                    <li><input type="checkbox"> checkbox 1</input></li>
                    <li><input type="checkbox"> checkbox 1</input></li>
                </ul> */}