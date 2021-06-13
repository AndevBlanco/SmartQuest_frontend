import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/UpdateSubjects.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import route from '../routes';

export default class UpdateQuestions extends Component{
    constructor(){
        super();
        this.state = {
            questions: [],
        }
    }

    componentDidMount(){
        this.getQuestions();
    }

    getQuestions(){
        try {
            request.get(route + 'questions/getAll')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, response) => {
                try {
                    const questionsGet = JSON.parse(response.text).questions;
                    this.setState({
                        questions: questionsGet
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

    handleDeleteQuestion({ target }){
        var response = prompt("Digite cualquier caracter para confirmar la eliminación");

        if(response !== null){
            try {
                request.delete(route + 'questions/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query({
                    id: target.value
                })
                .end((err, response) => {
                    try {
                        const res = JSON.parse(response.text).question;

                        if(res === true){
                            alert("Eliminación exitosa")
                            this.getQuestions();
                        }else{
                            alert("Error al eliminar")
                        }
                    } catch (error) {
                        console.log("Error: " + error);
                    }
                });
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    }

    render(){
        return (
            <section>
                <Table className="table table-hover table-striped table-subject__items">
                    <thead>
                        <tr className="table-header-subject__items">
                            <th>Nombre</th>
                            <th>Estudiante</th>
                            <th>Asignatura</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.questions.map((item, index) => {
                            return (
                                <tr key={item._id} style={{borderLeftColor: item.color_subject, borderLeftWidth: '7.5px', borderLeftStyle: 'solid'}}>
                                    <td>{item.name}</td>
                                    <td>{item.student}</td>
                                    <td>{item.name_subject}</td>
                                    <td>
                                        <button type="button" value={item._id} className="btn btn-danger btndelete" data-placement="top" onClick={this.handleDeleteQuestion.bind(this)}><i title="Eliminar" className="fa fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
        )
    }
}