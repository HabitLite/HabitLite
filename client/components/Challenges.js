import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



class Challenges extends React.Component {


    render() {

        return (
            // <div>
            //     <div className="group"><b>Challengess You Can Join</b></div>
            //     <div>
            //         <div className="images-div">
            //             <img src="https://openclipart.org/image/2400px/svg_to_png/293844/under-construction_geek_man_01.png" />
            //         </div>
            //         <span>We're under construction</span>
            //     </div>
            // </div>
            <div>

                <img src="https://openclipart.org/image/2400px/svg_to_png/293844/under-construction_geek_man_01.png" className="challenge" />

                <h3>We're under construction</h3>

            </div>
        )
    }
}
// const mapState = state => {
//     return {

//     }
// }

// const mapDispatch = dispatch => {

// }   
export default connect(null)(Challenges)
