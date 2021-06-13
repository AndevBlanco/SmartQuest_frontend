import React, { Component } from 'react';
import request from 'superagent';
import route from '../routes';
import '../assets/styles/components/Signin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';

export default class Signin extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: null,
            surname: null,
            code: null,
            type_user: null,
            email: null,
            password: null,
            updated_singup: false
        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}){
        this.setState({
            [target.name]: target.value
        })
    }

    register(e){
        e.preventDefault();
        var form = document.getElementsByTagName('form')[0];
        if(document.getElementsByName("grade").length){
            var grade_opt = document.getElementsByName("grade");
            console.log(grade_opt[0].value);
            this.setState({grade: grade_opt[0].value})
        }
        if(form.checkValidity()){
            request
            .post(route + 'users/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ 
                date: new Date(),
                name: this.state.name,
                surname: this.state.surname,
                //code: this.state.code,
                grade: this.state.grade,
                type_user: this.state.type_user,
                email: this.state.email,
                password: this.state.password,
            })
            .end((err, res) => {
                if(res.text){
                    alert("Registro Exitoso");
                    this.setState({updated_singup: true});
                }else{
                    alert("Error");
                }
            });
        }else{
            alert("Por favor ingrese los datos correctamente");
        }
    }

    componentDidMount(){
        var e = document.getElementsByName("type_user")
        console.log(e[0]);
    }

    render(){
        const {type_user} = this.state;
        return(
            <main id="signin">
                {this.state.updated_singup && <Redirect to="/login"/>}
                <section className="main-signin">
                    <section id="section-logo-signin">
                        <h1 id="title-signin">SmartQuest <i className="fas fa-question-circle"></i></h1>
                    </section>
                    <section id="section-form-signin">
                        <Form id="form-signin">
                            <Form.Row>
                                <Form.Group as={Col} controlId="name-signin">
                                    <Form.Control type="name" placeholder="Nombre" name="name" required onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="surname-signin">
                                    <Form.Control type="name" placeholder="Apellido" name="surname" required onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            {/* <Form.Row>
                                <Form.Group as={Col} controlId="code-signin">
                                    <Form.Control type="number" placeholder="Código" name="code" required onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row> */}
                            <Form.Row>
                                <Form.Group as={Row}>
                                    <Form.Check type="radio" name="type_user" label="Estudiante" value="student"  onClick={() => this.setState({type_user: 'student'})} required/>
                                    <Form.Check type="radio" name="type_user" label="Profesor"   value="teacher" onClick={() => this.setState({type_user: 'teacher'})} required/>
                                </Form.Group>
                            </Form.Row>
                            {type_user === "student" &&
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <select id="grade-signin" name="grade" onChange={this.handleChange} required>
                                            <option value="11">Once</option>
                                            <option value="10">Decimo</option>
                                            <option value="9">Noveno</option>
                                            <option value="8">Octavo</option>
                                            <option value="7">Séptimo</option>
                                            <option value="6">Sexto</option>
                                        </select>
                                    </Form.Group>
                                </Form.Row>
                            }
                            <Form.Row>
                                <Form.Group as={Col} controlId="email-signin">
                                    <Form.Control type="email" name="email" placeholder="Correo Electrónico" required onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="password-signin">
                                    <Form.Control type="password" name="password" placeholder="Contraseña" required onChange={this.handleChange}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="justify-content-xs-center">
                                <Form.Group as={Col} className="text-center">
                                    <Button type="submit" className="button-signin" id="signinB" onClick={this.register.bind(this)}>
                                        Registrarse
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </section>
                </section>
            </main>
        );
    };
};