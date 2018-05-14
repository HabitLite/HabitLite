import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'
import {levelUp} from '../store'

const getData = percent => {
  return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

/**
 * COMPONENT
 */
const Progress = props => { 
  let percent = props.progress
  if (percent >= 100) {
    props.incrementLevel(props.userId)

  }
    return (
      <div >
        <h1 className="progress">{props.name}</h1>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={getData(percent)}
            innerRadius={props.category ? 0 : 120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                  const color = d.y > 30 ? '#DBCFA6' : '#B33B33'
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
const mapState = (state, ownProps) => {
  let progress
  if (ownProps.category) {
    progress = state.user.XP ? ((ownProps.category.XP / state.user.XP) * 100) : 0
  }
  else {
    progress = state.user.progress
  }
  return {
    userId: state.user.id,
    progress: progress
  }
}

const mapDispatch = dispatch => {
  return {
    incrementLevel(userId) {
      dispatch(levelUp(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Progress)

/**
 * PROP TYPES
 */
Progress.propTypes = {
  userId: PropTypes.number,
  progress: PropTypes.number
}
