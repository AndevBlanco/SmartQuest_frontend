import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';

export default class Header extends Component{
    constructor(){
        super();
        this.state = {
            clicked : false,
            logoutClicked: false,
            logged: false,
            logout: false
        }
    }

    componentDidMount(){
        this.setState({
            username: localStorage.getItem("name"),
        })
    }

    handleClick =  () => {
        this.setState({
            clicked : !this.state.clicked
        })
    }

    render(){
        return (
            <section>
                {localStorage.getItem("login_pass") ?
                    <nav className="NavbarItems">

                        <div className="navbar-icons">
                            <h1 className="navbar-logo">SmartQuest <i className="fas fa-question-circle"></i></h1>
                        </div>
        
                        <div className="menu-icon" /* onClick={this.handleClick} */>
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div>
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {/* {MenuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a className={item.cName} href={item.url}>{item.title}</a>
                                    </li>
                                )
                            })} */}
                            {localStorage.getItem("type_user") === "root" &&
                                <li>
                                    <h4 className="nav-links name-user">
                                        <a href="/config" className="link-config__admin">Configuración</a>
                                    </h4>
                                </li>
                            }
                            <li onMouseOver={e => {this.setState({logoutClicked: true})}} onMouseLeave={e => {this.setState({logoutClicked: false})}}>
                                <h4 className="nav-links name-user">{localStorage.name} <i className="fas fa-user icon-user__name"></i></h4>
                                <div className={this.state.logoutClicked ? 'navbar-logout__box active' : 'navbar-logout__box'}>
                                    <h5 className="title-logout" onClick={e => {localStorage.clear()}}>Cerrar Sesión</h5>
                                </div>
                            </li>
                        </ul>
                    </nav> : <Redirect to="/login"/>
                }
            </section>
        );
    };
};