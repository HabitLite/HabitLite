import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

/**
 * COMPONENT
 */
class Progress extends React.Component {
  constructor() {
    super();
    this.state = {
      percent: 25, data: this.getData(0)
    };
  }

  componentDidMount() {
    let percent = 25;
    this.setStateInterval = window.setInterval(() => {
      percent += (Math.random() * 25);
      percent = (percent > 100) ? 0 : percent;
      this.setState({
        percent, data: this.getData(percent)
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    return (
      <div>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                  const color = d.y > 30 ? 'green' : 'red';
                  return d.x === 1 ? color : 'transparent';
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
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


// class Progress extends React.Component {
//   // constructor() {
//   //   super();
//   //   this.state = {
//   //     username: this.props.username,
//   //     percent: this.props.percent,
//   //     data: this.getData(0)
//   //   }
//   // }
//   //
//   // componentDidMount() {
//   //   let percent = 25;
//   //   this.setStateInterval = window.setInterval(() => {
//   //     percent += (Math.random() * 25);
//   //     percent = (percent > 100) ? 0 : percent;
//   //     this.setState({
//   //       percent, data: this.getData(percent)
//   //     });
//   //   }, 2000);
//   // }
//   //
//   // componentWillUnmount() {
//   //   window.clearInterval(this.setStateInterval);
//   // }
//   //
//   // getData(percent) {
//   //   return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
//   // }
//
//   render() {
//     return (
//       <div>
//         <VictoryPie/>
//       </div>
//     )
//   }
// }
