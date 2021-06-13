import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/Search.scss';
import QuestionItem from './QuestionItem';
import QuestionItemNew from './QuestionItemNew';
import route from '../routes';

export default class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            newQuestion: 'false',
            subjects: []
        };
    }

    componentDidMount(){
        this.getSubjects();
    }

    handleSearch(){
        console.log("ac");
    }

    getSubjects(){
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
                this.setState({
                    error: true
                });
            }
        });  
    }

    createQuestion(e){
        e.preventDefault();
        this.setState({newQuestion: 'true'});
    }

    render(){
        return(
            <section>
                <form action="" id="form-search">
                    <h2 className="main__title">¿Qué quieres aprender hoy?</h2>
                    <section id="form-group">
                        <input type="search" id="search" placeholder="Buscar" onChange={this.handleSearch.bind(this)}/>
                        {this.props.type === 'student' &&
                            <button className="btn-share" onClick={this.createQuestion.bind(this)}>Nueva Pregunta</button>
                        }
                    </section>
                </form>
                {this.state.newQuestion === 'true' && <QuestionItemNew show='true' subjects={this.state.subjects}/>}
                <QuestionItem/>
            </section>
        );
    }
}