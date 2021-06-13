import React, { Component } from 'react';
import '../assets/styles/components/Config.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Accordion } from 'react-bootstrap';
import UpdateSubjects from './UpdateSubjects';
import UpdateQuestions from './UpdateQuestions';
import UpdateUsers from './UpdateUsers';
import { BrowserRouter as Redirect } from 'react-router-dom';

export default class Config extends Component{
    render(){
        return (
            <section>
                {localStorage.getItem("type_user") === 'root' ? 
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle className="title-collapse__subject" as={Button} variant="link" eventKey="0">
                                Asignaturas
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <UpdateSubjects/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle className="title-collapse__subject" as={Button} variant="link" eventKey="1">
                                Preguntas
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <UpdateQuestions/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle className="title-collapse__subject" as={Button} variant="link" eventKey="2">
                                Usuarios
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <UpdateUsers/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> : <Redirect to="/login"/>}
            </section>
        )
    }
}