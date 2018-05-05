import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VicoryPie} from 'victory'

/**
 * COMPONENT
 */
class Progress extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     username: this.props.username,
  //     percent: this.props.percent,
  //     data: this.getData(0)
  //   }
  // }
  //
  // componentDidMount() {
  //   let percent = 25;
  //   this.setStateInterval = window.setInterval(() => {
  //     percent += (Math.random() * 25);
  //     percent = (percent > 100) ? 0 : percent;
  //     this.setState({
  //       percent, data: this.getData(percent)
  //     });
  //   }, 2000);
  // }
  //
  // componentWillUnmount() {
  //   window.clearInterval(this.setStateInterval);
  // }
  //
  // getData(percent) {
  //   return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  // }

  render() {
    return (
      <div>
        <VictoryPie/>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(Progress)

/**
 * PROP TYPES
 */
Progress.propTypes = {
  username: PropTypes.string
}


// ReactDOM.render(<Progress/>, mountNode);
