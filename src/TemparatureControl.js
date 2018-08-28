import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TempSlider from './TempSlider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import RaisedButton from 'material-ui/RaisedButton';

var updatedTemp = ''
class TemparatureControl extends Component {
  handleClick(event){
    var apiBaseUrl = "https://api.stringify.com/v2/";
    var seedId = this.props.thermostatInfo.seedId;
    // this.props.updatedTemp = this.newValue
    var temperatureSetPayload={
    "attribSet":[{
      "temperature": updatedTemp[0]
    }]
    };

    var controlHeaders = {
      'Content-type': 'application/json',
      'Authorization' : 'Bearer uf411CpsHjLCu1dXR2k3NKoI1qujHDXel6gnIsQMhXtyFWtklv3TlRRDoZ6csdAUxVKl8PADkwUYp9wgFHCrszvbYYKI2MrdXdXIigHxdILW6DyRNQM4UHdvTzcdWCGLjxiCtQLIvHozpW3FU9YO8kOjDPXrJtP8MJ8noUGtLVdY0dXsp9nfZdey6LbaYYFnIjjcHv3XYUALdx5iLRn45eXVEhJVLR4gtRpA52Xfu8lU9S65cvF52ViaQKvcw7k7'
    }

    //Making a call to login endpoint using hashed password generated by SHA256+base64
   axios.put(apiBaseUrl+'seeds/'+seedId+'/controls', temperatureSetPayload, { headers: controlHeaders})
    .then(function (controlResponse) {
      if(controlResponse.status === 200){
       toast.success('Temperature updated successfully!')
      }
    }) 
    .catch(function (error) {
    if(error.controlResponse.status === 401){
          toast.error('Error setting temperature, please try again!')
        
      } 
    });
  }

  getValue(val){
    updatedTemp = val.update
  }


  render() {
    var userFullName = this.props.apiresponse.data !== undefined ? this.props.apiresponse.data.fullName : 'Unknown'
    return (
      <div >
        <ToastContainer/>
        <MuiThemeProvider>
                  <AppBar
             title="NEST Thermostat Control"
           />
           <div align="left" style={{marginLeft:5+'em', marginTop:'5em'}}>
        <h1 style={{color:'#808889', fontFamily: 'palatino'}}> Welcome, {userFullName}!</h1>
        <h3 style={{color:'#adb1b2', fontFamily: 'palatino'}}> Please use below slider to set your thermostat to desired temperature</h3>
        <br/>
        <h3 style={{color:'#368e8e', fontFamily: 'palatino'}}> Name: <span style={{padding:"5px"}}>{this.props.thermostatInfo.name} </span></h3>
        <h3 style={{color:'#368e8e', fontFamily: 'palatino'}}> Id: <span style={{padding:"28px"}}>{this.props.thermostatInfo.seedId}</span> </h3>

        <br/>
        <TempSlider currentValue={this.props.thermostatInfo} newValue={this.getValue}/>
        <br/>
        <div align="center">
        <RaisedButton backgroundColor="#8ad88f" labelColor="white" label="Set" onClick={(event) => this.handleClick(event)}/>
        </div>
          </div>
          </MuiThemeProvider>
          </div>
    );
  }
}

export default TemparatureControl;