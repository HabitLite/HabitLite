import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



class Challenges extends React.Component {

    state = {
        src: "./images/checked-filled.png",
        isClicked: false
    }
    onBtnClick = (e) => {
        this.setState({ isClicked: true })
    }
    // handleClick = (e) => {
    //   e.preventDefault();
    //   const src = this.state.src;
    // }
    render() {

        return (
            <div>
                <div className="group"><b>Weekly Challenges:</b></div>
                <div>
                    <div className="points">Eat Healthy </div>
                    <div className="images-div">
                        <div><img src="./images/run.png" className="group-img"></img></div>
                        {this.state.isClicked ? <div><img src="./images/checked-filled.png" className="checked-filled"></img><span className="accept">Joined!</span></div> :
                            <div><img src="./images/checked.png" className="group-ckeck" onClick={this.onBtnClick}></img></div>
                        }
                    </div>
                    <div className="points">Coding Ninja</div>
                    <div className="images-div">

                        <div><img src="./images/yoga.png" className="group-img"></img></div>
                        <div><img src="./images/checked.png" className="group-ckeck"></img></div>
                    </div>
                    <div className="points">Increase Physical Activity</div>
                    <div className="images-div">

                        <div><img src="./images/cook.png" className="group-img"></img></div>
                        <div><img src="./images/checked.png" className="group-ckeck"></img></div>
                    </div>
                </div>
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
