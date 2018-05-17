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
                    <div className="points">No fast food this week! </div>
                    <div className="images-div">
                        <div><img src="./images/noFastFood.jpg" className="group-img"></img></div>
                        {this.state.isClicked ? <div><img src="./images/checked-filled.png" className="checked-filled"></img><span className="accept">You accepted the challenge!</span></div> :
                            <div><img src="./images/checked.png" className="group-ckeck" onClick={this.onBtnClick}></img></div>
                        }
                    </div>
                    <div className="points">Understand Recursion</div>
                    <div className="images-div">

                        <div><img src="./images/codeNinja.jpg" className="group-img"></img></div>
                        <div><img src="./images/checked.png" className="group-ckeck"></img></div>
                    </div>
                    <div className="points">It is nice out this week, Go Kayak!</div>
                    <div className="images-div">

                        <div><img src="./images/goKayak.jpg" className="group-img"></img></div>
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
