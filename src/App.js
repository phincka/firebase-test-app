import React from 'react';
import './css/app.scss'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LoginPage from './components/login-page'
import ProfilePage from './components/profile-page'
import authProtection from './authProtction'
import firebase, { auth, provider, database } from './firebase.js'


const ProtectedProfile = authProtection("/login")(ProfilePage);

class App extends React.Component{
  constructor() {
    super();
    console.log("user", auth.currentUser);
    this.state = {
      user: auth.currentUser,
    };
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
    
  }

  handleSignIn = history => (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  logout() {
    auth.signOut().then((result) => {
      this.setState({
        user: null
      })
    })
  }

  render(){
    const { user } = this.state;
    
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <div>
                  <Link to="/" >Home</Link>
                  <Link to="/public" >Public</Link>
                  <Link to="/profile">Profile</Link>
                </div>
              )}
            />
            <Route
              path="/login"
              exact
              render={({ history }) => (
                <div>
                  <Link to="/">Home</Link>
                  <LoginPage onSubmit={this.handleSignIn(history)}/>
                </div>
              )}
            />
            <Route
              path="/profile"
              exact
              render={props => (
                <div>
                  <Link to="/">Home</Link>
                  <ProtectedProfile {...props} user={user} displayName={'aa'} />
                </div>
              )}
            />
            <Route
              path="/public"
              exact
              render={(props) => (
                <div>
                  <Link to="/">Home</Link>
                  <ProtectedProfile {...props} user={user} displayName={'aa'} />
                  <p>
                    Public Route, anyone can see this page.
                </p>
                </div>
              )}
            />
            <Route
              path="/"
              exact
              render={(props) => (
                <div>
                  <Link to="/">Home</Link>
                  <ProtectedProfile {...props} user={user} displayName={'aa'} />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
        {
          user ? <button onClick={this.logout}>Log Out</button> : console.log('Zalogowano')
        }
      </div>
    );
  }
}

export default App;
