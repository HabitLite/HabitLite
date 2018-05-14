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

    return (
      <div >
        <h1 className="total-progress">{props.name}</h1>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={getData(props.progress)}
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
                  text={`${Math.round(props.progress)}%`}
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
    progress = state.user.xp ? ((ownProps.category.XP / state.user.xp) * 100) : 0
  }
  else {
    progress = state.user.progress
  }
  return {
    progress: progress
  }
}

export default connect(mapState)(Progress)

/**
 * PROP TYPES
 */
Progress.propTypes = {
  progress: PropTypes.number
}
