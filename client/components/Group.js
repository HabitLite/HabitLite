import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



class Group extends React.Component {
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
        <div className="group"><b>Groups You Can Join</b></div>
        <div>
          <div className="points">Points to unlock: 350</div>
          <div className="images-div">
            <div><img src="./images/run.png" className="group-img"></img></div>
            {this.state.isClicked ? <div><img src="./images/checked-filled.png" className="checked-filled"></img><span className="accept">Joined!</span></div> :
              <div><img src="./images/checked.png" className="group-ckeck" onClick={this.onBtnClick}></img></div>
            }
          </div>
          <div className="points">Points to unlock: 450</div>
          <div className="images-div">

            <div><img src="./images/yoga.png" className="group-img"></img></div>
            <div><img src="./images/checked.png" className="group-ckeck"></img></div>
          </div>
          <div className="points">Points to unlock: 550</div>
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
export default connect(null)(Group)
