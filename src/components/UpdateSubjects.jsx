import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/UpdateSubjects.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Button, Table, Modal } from 'react-bootstrap';
import route from '../routes';

export default class UpdateSubjects extends Component{
    constructor(){
        super();
        this.state = {
            subjects: [],
            loadedSubjects: true,
            show: false,
            setShow: false,
            name_subject: null,
            color_subject: null,
            grade_subject: null,
            deletedSubject: false,
        }
    }

    handleClose = () => this.setState({setShow:false, show: false});
    handleShow = () => this.setState({setShow: true, show: true});

    handleChangeForm({ target }){
        this.setState({
            [target.name]: target.value
        });
    }

    handleSelectedSubjects(){
        this.setState({
            grade_subject: this.getSelectValues(document.getElementsByName("grade_subject")[0])
        })
    }

    getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
        return result;
    }

    handleSaveSubject(){
        try {
            request
            .post(route + 'subjects/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ 
                name: this.state.name_subject,
                color: this.state.color_subject,
                grade: JSON.stringify(this.state.grade_subject),
            })
            .end(function(err, res){
                console.log(res.text);
            });
        } catch (error) {
            alert("Error al guardar pregunta");
        }
    }

    handleDeleteSubject( { target }){
        var response = prompt("Digite cualquier caracter para confirmar la eliminación");

        if(response !== null){
            try {
                request.delete(route + 'subjects/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query({
                    id: target.value
                })
                .end((err, response) => {
                    try {
                        const res = JSON.parse(response.text).subject;

                        if(res === true){
                            alert("Eliminación exitosa")
                            this.getSubjects();
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

    componentDidMount(){
        this.getSubjects();
    }

    getSubjects(){
        try {
            request.get(route + 'subjects/getAll')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, response) => {
                try {
                    const subjectsGet = JSON.parse(response.text).subjects;
                    this.setState({
                        subjects: subjectsGet
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

    render(){
        return (
            <section>
                <Button className="button-answer button-create__subject" variant="primary" onClick={this.handleShow}>Crear Asignatura</Button>
                <Table className="table table-hover table-striped table-subject__items">
                    <thead>
                        <tr className="table-header-subject__items">
                            <th>Nombre</th>
                            <th>Grados</th>
                            <th>Numero</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.subjects.map((item, index) => {
                            return (
                                <tr key={item._id} style={{borderLeftColor: item.color, borderLeftWidth: '7.5px', borderLeftStyle: 'solid'}}>
                                    <td>{item.name}</td>
                                    <td>{item.grade.join(' - ')}</td>
                                    <td>{item.question_counter}</td>
                                    <td>
                                        <button type="button" value={item._id} className="btn btn-danger btndelete" data-placement="top" onClick={this.handleDeleteSubject.bind(this)}><i title="Eliminar" className="fa fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Configuración de Asignatura</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="">
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control type="text" name="name_subject" placeholder="Asignatura" onChange={this.handleChangeForm.bind(this)}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control as="select" name="grade_subject" multiple onChange={this.handleSelectedSubjects.bind(this)}>
                                        <option value="11">Once</option>
                                        <option value="10">Decimo</option>
                                        <option value="9">Noveno</option>
                                        <option value="8">Octavo</option>
                                        <option value="7">Séptimo</option>
                                        <option value="6">Sexto</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control type="color" name="color_subject" onChange={this.handleChangeForm.bind(this)}>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSaveSubject.bind(this)}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
        )
    }
}