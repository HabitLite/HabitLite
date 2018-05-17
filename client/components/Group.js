import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: "./images/checked-filled.png",
      isClicked: false
    }
    // { avatar, username, level, lives, HP, XP } = props
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
      < div >


        <div className="user-panel">
          <div className="avatar">
            <img className="user-image" src="../images/user.png"></img>
            {/* Avatar: {avatar} */}
          </div>
          <div className="username">
            <span>Username </span><br />{this.props.username}
          </div>
          <div className="level">
            <span>Level</span><br />{this.props.level + 1}
          </div>
          <div className="lives">
            <span> Lives </span><br />{this.props.lives}
          </div>
          <div className="HP">
            <span>HP </span><br />{this.props.HP}
          </div>
          <div className="XP">
            <span>Total XP </span><br />{this.props.XP}
          </div>
        </div>

        <div className="group"><b>Groups You Can Join</b></div>
        <div>

          <div className="points">5K Trainning <br /> Points to unlock: 350</div>
          <div className="images-div">
            <div><img src="./images/run.png" className="group-img"></img></div>
            {this.state.isClicked ? <div><img src="./images/checked-filled.png" className="checked-filled"></img><span className="accept">Joined!</span></div> :
              <div><img src="./images/checked.png" className="group-ckeck" onClick={this.onBtnClick}></img></div>
            }
          </div>
          <div className="points">Free Yoga Lesson <br />Points to unlock: 450</div>
          <div className="images-div">
            <div><img src="./images/yoga.png" className="group-img"></img></div>
            <div><img src="./images/checked.png" className="group-ckeck"></img></div>
          </div>
          <div className="points">Healthy Baking Class <br />Points to unlock: 550</div>
          <div className="images-div">
            <div><img src="./images/cook.png" className="group-img"></img></div>
            <div><img src="./images/checked.png" className="group-ckeck"></img></div>
          </div>
        </div>
      </div >
    )
  }
}
/* *** CONTAINER *** */
const mapState = state => {
  // console.log("STATEINUSERIS", state)
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    level: state.user.level,
    lives: state.user.lives,
    HP: state.user.hp,
    XP: state.user.xp
  }
}

// const mapDispatch = dispatch => {

// }   
export default connect(mapState)(Group)
Group.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  XP: PropTypes.number.isRequired
}