import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/SubjectItem.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import route from '../routes';
import { Card, Alert } from 'react-bootstrap';

export default class SubjectItem extends Component{
    constructor(){
        super();
        this.state = {
            subjects: [],
            error: false,
            loadedSubjects: true
        };
    }

    componentDidMount(){
        this.getSubjects();
    }

    getSubjects(){
        if(localStorage.type_user === "student"){
            try {
                request.post(route + 'subjects/byGrade')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ 
                    grade: localStorage.grade
                })
                .end((err, response) => {
                    try {
                        const subject = JSON.parse(response.text).subject;
                        this.setState({
                            subjects: subject
                        });
                    } catch (error) {
                        console.log("Error: " + error);
                        this.setState({loadedSubjects: false});
                    }
                });
            } catch (error) {
                console.log("Error: " + error);
                this.setState({loadedSubjects: false});
            }
        }else{
            try {
                request.get(route + 'subjects/getAll')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .end((err, response) => {
                    try {
                        const subject = JSON.parse(response.text).subjects;
                        console.log(subject);
                        this.setState({
                            subjects: subject
                        });
                    } catch (error) {
                        console.log("Error: " + error);
                        this.setState({loadedSubjects: false});
                    }
                });
            } catch (error) {
                console.log("Error: " + error);
                this.setState({loadedSubjects: false});
            }
        }
    }

    changeSubject = (param = '') => {
        this.props.toSearch(param);
    };

    render(){
        return(
            <section name="subject-section__side">
                {!this.state.loadedSubjects && <Alert variant="danger">Error al cargar las asignaturas</Alert>}
                <Card className="subject-card" style={{borderColor: '#6568f4'}} onClick={e => {localStorage.setItem("search_subject", ''); localStorage.setItem("to_search", true); this.changeSubject('')}}>
                    <Card.Body>
                        <Card.Title className="subject-title" style={{color: '#6568f4'}}>Todas las Asignaturas</Card.Title>
                    </Card.Body>
                </Card>
                {this.state.subjects.map((item, index) => {
                    return(
                        <Card className="subject-card" key={"key_" + item._id} style={{borderColor: item.color}} onClick={e => {localStorage.setItem("search_subject", item.name); localStorage.setItem("to_search", true); this.changeSubject(item.name)}}>
                            <Card.Body>
                                <Card.Title className="subject-title" style={{color: item.color}}>{item.name}</Card.Title>
                                {<Card.Subtitle className="mb-2 text-muted">{item.question_counter} Preguntas</Card.Subtitle>}
                            </Card.Body>
                        </Card>
                    );
                })}
            </section>
        );
    };
}