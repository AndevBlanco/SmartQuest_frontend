import React, { Component } from 'react';
import request from 'superagent';
import route from '../routes';
import '../assets/styles/components/Login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            xusername: null,
            xpassword: null,
            login: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.xlogin = this.xlogin.bind(this);
    }

    handleChange({target}){
        this.setState({
            [target.name]: target.value
        });
    }

    xlogin(e){
        e.preventDefault();
        try {
            request
            .post(route + 'users/login')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                xusername: this.state.xusername,
                xpassword: this.state.xpassword,
            })
            .end((err, res) => {
                if(err){
                    return null;
                }
                if(res && res.text){
                    var response = JSON.parse(res.text);
                    if(response.login === true){
                        if(typeof(Storage) !== 'undefined'){
                            localStorage.setItem("login_pass", response.login);
                            localStorage.setItem("id", response.id);
                            localStorage.setItem("name", response.name);
                            localStorage.setItem("code", response.code);
                            localStorage.setItem("grade", response.grade);
                            localStorage.setItem("type_user", response.type_user);
                        }
                        this.setState({
                            login: true
                        });
                    }else if(response.login === false){
                        alert("Error al ingresar, por favor verifique los datos ingresados");
                    }
                }
            });
        } catch (error) {
            alert("Error al ingresar, por favor verifique los datos ingresados");
        }
    }

    render(){
        return(
            <main id="login">
                <section className="main-container">
                    <section id="section-logo">
                        <h1 id="title-login">SmartQuest <i className="fas fa-question-circle"></i></h1>
                    </section>
                    <section id="section-form">
                        <Form id="form-login">
                            <Form.Row>
                                <Form.Group as={Col} controlId="email-login" className="input-login">
                                    <Form.Control type="email" name="xusername" placeholder="Correo Electrónico" onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="password-login" className="input-login">
                                <Form.Control type="password" name="xpassword" placeholder="Contraseña" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Row className="justify-content-xs-center">
                                <Form.Group as={Col} className="text-center">
                                    <Button type="submit" className="button-login" id="loginB" onClick={this.xlogin}>
                                        Iniciar Sesión
                                    </Button>
                                    <Link to="/signin">
                                        <Button type="submit" className="button-login" id="signinB">
                                            Registrarse
                                        </Button>
                                    </Link>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </section>
                </section>
                {!this.state.login ? null : <Redirect to="/"/> }
            </main>
        );
    };
};