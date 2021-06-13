import React, { Component } from 'react';
import '../assets/styles/App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Subjects from '../components/Subjects';
import Login from '../components/Login';
import Signin from '../components/Signin';
import Questions from '../components/Questions';
import Answers from '../components/Answers';
import Config from '../components/Config';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      logged: localStorage.getItem("login_pass"),
      username: localStorage.getItem("name"), 
      user_id: localStorage.getItem("id"), 
      code: localStorage.getItem("code"), 
      grade: localStorage.getItem("grade"),
      subject_name: null,
    }
  }

  searchSubject = (subject_name) => {
    this.setState({subject_name: subject_name})
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/signin">
              {localStorage.getItem("login_pass") ? <Redirect to="/"/> : <Signin/>} 
            </Route>
            <Route path="/login">
              {localStorage.getItem("login_pass") ? <Redirect to="/"/> : <Login/>}
            </Route>
            <Route path="/answer">
                <section>
                  <Header username={this.state.username}/>
                  <main className="main-answer__section">
                    <Answers/>
                  </main>
                </section>
            </Route>
            <Route path="/config">
                <section>
                  <Header username={this.state.username}/>
                  <main className="main-updateSubjects__section">
                    <Config/>
                  </main>
                </section>
            </Route>
            <Route path="/" exact>
                <section>
                  <Header username={this.state.username}/>
                  <main className="body-section">
                    <Subjects toSearch={this.searchSubject}/>
                    <Questions toSearch={this.state.subject_name}/>
                  </main>
                </section>
                {/* {localStorage.getItem("logged") && console.log("log")}
                {localStorage.setItem("logged", false)} */}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
