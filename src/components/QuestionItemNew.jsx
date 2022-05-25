import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/QuestionItemNew.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class QuestionItemNew extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: [],
            subject: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEditor = this.handleChangeEditor.bind(this);
    }

    handleChange({ target }){
        this.setState({
            [target.id] : target.value
        });
    }

    handleChangeEditor(target){
        this.setState({
            description: JSON.stringify(target)
        });
    }

    componentDidMount(){
        var e = document.getElementsByName("subject_field");
        this.setState({
            subject: e[0].value
        });
    }

    saveQuestion(e){
        e.preventDefault();
        if(this.state.title !== '' && this.state.description !== '' && this.state.subject !== ''){
            try {
                var save_subject = (this.props.subjects).find((item, index) => item.name == this.state.subject);

                request
                .post(process.env.REACT_APP_URL_BACKEND + 'questions/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ 
                    date: new Date(),
                    name: this.state.title,
                    subject_name: save_subject.name,
                    subject_grade: JSON.stringify(save_subject.grade),
                    subject_color: save_subject.color,
                    description: this.state.description,
                    student: localStorage.name
                })
                .end((err, res) => {
                    //console.log(res.text);
                    if(res.text){
                        alert("Se agregó la pregunta exitosamente")
                        this.props.saved(true);
                    }
                });
            } catch (error) {
                alert("Error al guardar pregunta");
            }
        }else{
            alert("Por favor ingrese los datos de la pregunta");
        }
    }

    render(){
        return (
            this.props.show === 'true' && 
                <section className="question-new-section">
                    <Card className="new-question-card">
                        <Card.Header className="">
                            <select className="form-control" id="subject" name="subject_field" onChange={this.handleChange} required>
                                {this.props.subjects.map((item, index) => {
                                    return(
                                        <option key={index}>{item.name}</option>
                                    );
                                })}
                            </select>
                        </Card.Header>
                        <Card.Body>
                            <div className="sub-container-card">
                                <input type="text" className="form-control" id="title" placeholder="Título" onChange={this.handleChange} required/>
                            </div>
                            <div className="sub-container-card">
                                <Editor wrapperClassName="wrapper" toolbar={{ options: ['inline', 'list', 'link', 'emoji', 'embedded'], inline: {options: ['bold', 'italic', 'strikethrough']}}} id="description" placeholder="Descripción" onChange={this.handleChangeEditor} required></Editor>
                            </div>
                            <div className="sub-container-card">
                                <button className="btn-share" onClick={this.saveQuestion.bind(this)}>Publicar Pregunta</button>
                            </div>
                        </Card.Body>
                    </Card>
                </section>
        );
    }
}
