import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

const getData = percent => {
  return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

/**
 * COMPONENT
 */
const Progress = props => {
  const percent = (props.XP / (Math.pow(props.level, 2) * 10)) * 100
    return (
      <div >
        <h1 className="total-progress">{props.name}</h1>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={getData(percent)}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                  const color = d.y > 30 ? 'green' : 'red'
                  return d.x === 1 ? color : 'transparent'
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={props}>
            {() => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(percent)}%`}
                  style={{ fontSize: 45 }}
                />
              )
            }}
          </VictoryAnimation>
        </svg>
      </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    XP: 20, //should be state.user.XP but right now XP is 0, and that wouldn't show that the graph works
    level: 2 //should be state.user.level
  }
}

export default connect(mapState)(Progress)

/**
 * PROP TYPES
 */
Progress.propTypes = {
  XP: PropTypes.number,
  level: PropTypes.number
}
