import React, { Component } from 'react';
import Login from './Login';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      isLogin:true
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    this.setState({
                  loginscreen:loginscreen
                    })
  }
  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
      </div>
    );
  }
}
export default Loginscreen;