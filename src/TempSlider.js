import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import { Handle } from './components/Handle' 
import { Track } from './components/Track' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: '#eff2f2',
}


const domain = [50, 90];
const defaultValues =[]

class TempSlider extends Component {
  defaultValues = defaultValues.push(this.getCurrentValue());
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

   getCurrentValue() {
    return this.props.currentValue.attribSet[0].temperature;
  }

  onUpdate = update => {
    this.props.newValue({update})
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const { state: { values, update } } = this
    defaultValues.push(this.props.currentValue.attribSet[0].temperature)
    return (
      <div style={{ height: 100, width: '30%'}}>
        {/* <ValueViewer values={values} update={update} /> */}
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
        <br/>
        <br/>
          <h3 style={{color:'#368e8e', fontFamily: 'palatino'}}>Temperature: <span style={{color:"#62d6d4", fontWeight: "bolder"}}>{update}</span></h3>
      </div>
    )
  }
}

export default TempSlider