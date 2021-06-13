import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/AnswersItemNew.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Alert } from 'react-bootstrap';
import route from '../routes';

export default class AnswersItemNew extends Component {
    constructor() {
        super();
        this.state = {
            description_answer: null,
            savedAnswer: false,
            errorAnswer: false,
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    saveAnswer(event) {
        event.preventDefault();
        try {
            request
                .put(route + 'questions/answer')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query({
                    id: localStorage.getItem("question_id")
                })
                .send({
                    date_answer: new Date(),
                    teacher: localStorage.getItem("name"),
                    description_answer: this.state.description_answer
                })
                .end((err, res) => {
                    try {
                        this.setState({savedAnswer: true});
                    } catch (error) {
                        console.log("Error: " + error);
                        this.setState({errorAnswer: true});
                    }
                });
        } catch (error) {
            console.log("Error: " + error);
            this.setState({errorAnswer: true});
        }
    }


    render() {
        return (
            <section>
                {this.state.savedAnswer && <Alert variant="success">Respuesta Guardada Exitosamente</Alert>}
                {this.state.errorAnswer && <Alert variant="danger">Error al Guardar Respuesta</Alert>}
                <Card className="answer-card border-success">
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <h5 className="title-new__answer">Respuesta:</h5>
                            <textarea className="answer-input__description" name="description_answer" id="" rows="3" placeholder="Descripción" onChange={this.handleChange.bind(this)}></textarea>
                        </blockquote>
                        <button className="btn-share__response btn btn-success" onClick={this.saveAnswer.bind(this)}>Publicar Respuesta</button>
                    </Card.Body>
                </Card>
            </section>
        );
    }
}