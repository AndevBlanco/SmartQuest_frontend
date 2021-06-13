import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/Questions.scss';
import QuestionItem from './QuestionItem';
import QuestionItemNew from './QuestionItemNew';
import route from '../routes';


export default class Questions extends Component{
    constructor(){
        super();
        this.state = {
            type_user: localStorage.getItem("type_user"),
            newQuestion: 'false',
            subjects: [],
            keyword: null,
            savedNewQuestion: false,
        };
    }

    componentDidMount(){
        this.getSubjects();
    }

    handleSearch({ target }){
        this.setState({
            keyword: target.value
        })
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

    savedQuestion = (param) => {
        this.setState({savedNewQuestion: param});
    }

    render(){
        return(
            <main className="questions-section">
                <section>
                    <form action="" id="form-search">
                        <h2 className="main__title">¿Qué quieres aprender hoy?</h2>
                        <section id="form-group">
                            <input type="search" id="search" placeholder="Buscar" onChange={this.handleSearch.bind(this)}/>
                            {this.state.type_user === 'student' &&
                                <button className="btn-share" onClick={this.createQuestion.bind(this)}>Nueva Pregunta</button>
                            }
                        </section>
                    </form>
                    {this.state.newQuestion === 'true' && <QuestionItemNew show='true' subjects={this.state.subjects} saved={this.savedQuestion}/>}
                    <QuestionItem filter={this.props.toSearch} saved={this.savedQuestion} refresh={this.state.savedNewQuestion} filter_keyword={this.state.keyword}/>
                </section>
            </main>
        );
    }   
}