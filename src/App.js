import React, {Component} from 'react';
import './App.css';
import PassContainer from './components/PassContainer'
import PassForm from './components/PassForm'
import { patchPass, postPass, deletePass } from './helpers'
import SignUpForm from './components/SignUpForm';
import {Route, Switch, Redirect, Link} from 'react-router-dom' 
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home';
const passesUrl = "http://localhost:3000/passes/"

class App extends Component {

  state = {
    passes: [],
    user: null,
    alerts: []
  }
 
  componentDidMount(){
  
      this.authorize_user()
    
  }

  authorize_user = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        user: response.user,
        passes: response.passes
      })
    })
  }

  addPass = (newPass) => {
    this.setState({
    passes: [...this.state.passes, newPass]
    })
    
    postPass(newPass, this.state.user)
  }

  updatePass = (updatedPass) => {
    let passes = this.state.passes.map(pass => pass.id === updatedPass.id ? updatedPass : pass)

    this.setState({passes})

    patchPass(updatedPass)
  }

  deletePass = (id) => {
    let filtered = this.state.passes.filter(pass => pass.id !== id)
    this.setState({
      passes: filtered
    })

    deletePass(id)
  }

  login = ({username, password}) => {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          user: response.user,
          alerts: ["Logged In!"],
          passes: response.passes
        })
      }
    })
  } 

  signUp = (user) =>  {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          user: response.user,
          alerts: ["New user added"],
          passes: response.passes
        })
      }
    })
  } 

  render(){
    return (
      <div className="App">
        <header>
          {this.state.user
          ? (
            <> 
              <p>Welcome back {this.state.user.username}</p> 
              <nav>
                <Link to="/signup">Logout</Link>
              </nav>
            </>
          )
          : null}
        </header>
        <h1>Bike Pass App</h1>
        <Switch>
          <PrivateRoute 
            exact
            path="/" 
            component={Home}
            submitAction={this.addPass}
            updatePass={this.updatePass} 
            deletePass={this.deletePass} 
            passes={this.state.passes}
          />

          <Route exact path="/signup" render={(routerProps) => {
            return <SignUpForm {...routerProps} login={this.login} signUp={this.signUp} alerts={this.state.alerts}/>} 
          }/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }  
}
export default App;
