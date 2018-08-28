import React from 'react'
import PropTypes from 'prop-types'
export function Track({ source, target, getTrackProps }) {
    return (
      <div
        style={{
          position: 'absolute',
          height: 14,
          zIndex: 1,
          backgroundColor: '#8dd2e8',
          borderRadius: 7,
          cursor: 'pointer',
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps()}
      />
    )
  }
  
  Track.propTypes = {
    source: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percent: PropTypes.number.isRequired,
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percent: PropTypes.number.isRequired,
    }).isRequired,
    getTrackProps: PropTypes.func.isRequired,
  }