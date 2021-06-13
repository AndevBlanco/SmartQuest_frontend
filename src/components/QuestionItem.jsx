import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import request from 'superagent';
import '../assets/styles/components/QuestionItem.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Alert, Row } from 'react-bootstrap';
import route from '../routes';

export default class QuestionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            reload: null,
            goAnswer: false,
            loadedQuestion: true,
        }
    }

    componentDidMount() {
        this.getQuestions('');
        this.setState({subject_tosearch: this.props.filter});
    }

    componentDidUpdate(){
        if(this.props.filter !== this.state.subject_tosearch || this.props.refresh === true){
            this.reloadQuestions(this.props.filter)
            this.setState({subject_tosearch: this.props.filter});
            this.props.saved(false);
        }
    }

    reloadQuestions = (param) => {
        if (param == '') {
            this.getQuestions('');
        } else {
            this.getQuestions('Filter');
        }
    }

    /* componentDidUpdate() {
        if (localStorage.getItem("search_subject") == '') {
            this.getQuestions('');
        } else {
            this.getQuestions('Filter');
        }
    } */

    getQuestions(opt = '') {
        console.log("refresh");
        if (localStorage.type_user === 'student') {
            try {
                request.get(route + 'questions/byGrade' + opt)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .query({
                        grade: localStorage.grade,
                        subject: localStorage.getItem("search_subject")
                    })
                    .end((err, response) => {
                        try {
                            const questions = JSON.parse(response.text).question;
                            this.setState({
                                questions: questions,
                                loadedQuestion: true
                            });
                            console.log(questions);
                        } catch (error) {
                            console.log("Error: " + error);
                            this.setState({ loadedQuestion: false });
                        }
                    });
            } catch (error) {
                console.log("Error: " + error);
                this.setState({ loadedQuestion: false });
            }
        } else {
            try {
                request.get(route + 'questions/getAll' + opt)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .query({
                        subject_filter: localStorage.getItem("search_subject")
                    })
                    .end((err, response) => {
                        try {
                            const questions = JSON.parse(response.text).questions;
                            this.setState({
                                questions: questions,
                                loadedQuestion: true
                            });
                            console.log(questions);
                        } catch (error) {
                            console.log("Error: " + error);
                            this.setState({ loadedQuestion: false });
                        }
                    });
            } catch (error) {
                console.log("Error: " + error);
                this.setState({ loadedQuestion: false });
            }
        }
    }

    render() {
        return (
            <section>
                {!this.state.loadedQuestion && <Alert variant="danger">Error al cargar las preguntas</Alert>}
                {this.state.questions.map((item, index) => {
                    return (
                        <Link key={"link_" + item._id} to={{ pathname: "/answer" }} className="card-answer__link">
                            <Card key={item._id} className="question-card" style={{ borderColor: item.color_subject }} onClick={e => localStorage.setItem("question_id", item._id)}>
                                <Card.Header className={"subject-name"} style={{ color: item.color_subject }}>{item.name_subject}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <blockquote className="blockquote mb-0">
                                        <footer className="text-muted">
                                            <i className="far fa-edit icon-answer"></i>
                                            <cite className="number-answer">{item.answers_counter} Respuestas</cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        </Link>
                    );
                })}
            </section>
        );
    }
}