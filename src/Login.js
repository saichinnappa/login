import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TemparatureControl from './TemparatureControl';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
var isLoginSuccessful = false;
class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  }
 }

 handleClick(event){
    var apiBaseUrl = "https://api.stringify.com/v2/";
    var uploadScreen=[];
    var self = this;
    var loginPayload={
    "emailAddress":this.state.username,
    "password":this.state.password
    }
  
    if (this.state.username === undefined || this.state.username === '') {
      toast.error("Email cannot be blank!")
      return
    }
    if (this.state.password === undefined || this.state.password === '') {
      toast.error("Password cannot be blank!")
      return
    }

    var loginHeaders = {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'x-stringify-version': '2.0'
    }

    var seedHeaders = {
      'Authorization' : 'Bearer uf411CpsHjLCu1dXR2k3NKoI1qujHDXel6gnIsQMhXtyFWtklv3TlRRDoZ6csdAUxVKl8PADkwUYp9wgFHCrszvbYYKI2MrdXdXIigHxdILW6DyRNQM4UHdvTzcdWCGLjxiCtQLIvHozpW3FU9YO8kOjDPXrJtP8MJ8noUGtLVdY0dXsp9nfZdey6LbaYYFnIjjcHv3XYUALdx5iLRn45eXVEhJVLR4gtRpA52Xfu8lU9S65cvF52ViaQKvcw7k7'
    }

    //Making a call to login endpoint using hashed password generated by SHA256+base64
   axios.post(apiBaseUrl+'login', loginPayload, { headers: loginHeaders})
    .then(function (loginResponse) {
      if(loginResponse.status === 200){
        var seedResponse = []
        var firstThermostat = {}
        //Making a call to seeds endpoint to get list of seeds associated
        axios.get(apiBaseUrl+'seeds', { headers: seedHeaders})
        .then(function (response) {
          if(response.status === 200){
            seedResponse = response
            //Filtering the seeds based on brand Name and Rosetta ID, and grab the first object
            seedResponse.data.seeds.forEach(seed => {
              if(seed.brand === 'Nest' && seed.myHubRosetta === 'w1qUpEDz_1'){
                firstThermostat = JSON.parse(JSON.stringify(seed));
                return
              }
          });
          isLoginSuccessful = true;
          uploadScreen.push(<TemparatureControl updatedTemp='' thermostatInfo={firstThermostat} appContext={self.props.appContext} apiresponse={loginResponse} isAuthorized={isLoginSuccessful}/>)
          self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
          }
        });
      }
      
    }) 
    .catch(function (error) {
    if(error.loginResponse.status === 401){
        if(!isLoginSuccessful){
          toast.error('Incorrect Email or Password. Try again!')
        }
      } 
    });
  }
render() {
    return (
      <div>
      <ToastContainer
            toastClassName="dark-toast"
          />
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Email Address"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;