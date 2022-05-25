import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/AnswersItemNew.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Alert } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class AnswersItemNew extends Component {
    constructor() {
        super();
        this.state = {
            description_answer: null,
            savedAnswer: false,
            errorAnswer: false,
        }
        this.handleChangeEditor = this.handleChangeEditor.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleChangeEditor(target){
        this.setState({
            description_answer: JSON.stringify(target)
        });
    }

    saveAnswer(event) {
        event.preventDefault();
        try {
            request
                .put(process.env.REACT_APP_URL_BACKEND + 'questions/answer')
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
                            <div className="sub-container-card">
                                <Editor wrapperClassName="wrapper" toolbar={{ options: ['inline', 'list', 'link', 'emoji', 'embedded'], inline: {options: ['bold', 'italic', 'strikethrough']}}} id="description_answer" placeholder="Descripción" onChange={this.handleChangeEditor} required></Editor>
                            </div>
                        </blockquote>
                        <button className="btn-share__response btn btn-success" onClick={this.saveAnswer.bind(this)}>Publicar Respuesta</button>
                    </Card.Body>
                </Card>
            </section>
        );
    }
}