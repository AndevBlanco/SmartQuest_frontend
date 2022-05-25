import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/Answers.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Alert } from 'react-bootstrap';
import AnswersItemNew from './AnswersItemNew';
import draftToHtml from 'draftjs-to-html';

export default class Answers extends Component{
    constructor(){
        super();
        this.state = {
            answers: null,
            newAnswer: null,
            loadedAnswers: true,
            passed: localStorage.getItem("login_pass")
        }
    }

    componentDidMount(){
        this.getAnswers();
    }

    getAnswers(){
        try {
            request.get(process.env.REACT_APP_URL_BACKEND + 'questions/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .query({ 
                id: localStorage.question_id
            })
            .end((err, response) => {
                try {
                    const questions = JSON.parse(response.text).question;
                    this.setState({
                        answers: questions
                    });
                } catch (error) {
                    console.log("Error: " + error);
                    this.setState({loadedAnswers: false});
                }
            });
        } catch (error) {
            console.log("Error: " + error);
            this.setState({loadedAnswers: false});
        }
    }

    createNewAnswer(event){
        event.preventDefault();
        this.setState({
            newAnswer: true
        })
    }

    render(){
        return(
            <main className="answer-section border-primary">
                {/* {!this.state.passed && <Redirect to="/login"/>} */}
                {!this.state.loadedAnswers && <Alert variant="danger">Error al cargar las respuestas</Alert>}
                {this.state.answers &&
                    <Card style={{borderColor: this.state.answers.color_subject}}>
                        <Card.Header className="subject-name" style={{color: this.state.answers.color_subject}}>{this.state.answers.name_subject}</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.state.answers.name}</Card.Title>
                            <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(this.state.answers.description)) }} />
                            <footer className="blockquote-footer cite-student__answer">
                                <cite title="Source Title">{this.state.answers.student}</cite>
                            </footer>
                            {localStorage.type_user === "teacher" &&
                                <Button className="button-answer" variant="primary" onClick={this.createNewAnswer.bind(this)}>Responder</Button>
                            }
                        </Card.Body>
                    </Card>
                }
                {this.state.newAnswer && <AnswersItemNew/>}
                {this.state.answers ?
                    this.state.answers.answers.map((item, index) => {
                        return(
                            <Card key={item._id} className="answer-card border-success">
                                <Card.Body>
                                    <h5 className="title-answers">Respuesta:</h5>
                                    <blockquote className="blockquote mb-0">
                                    <div className="answer-card-text" dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(item.description_answer)) }} />
                                    <footer className="blockquote-footer">
                                        Profesor: <cite title="Source Title">{item.teacher}</cite>
                                    </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )
                    }):null
                }
            </main>
        );
    };
}