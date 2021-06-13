import React, { Component } from 'react';
import request from 'superagent';
import '../assets/styles/components/UpdateSubjects.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import route from '../routes';

export default class UpdateUsers extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers(){
        try {
            request.get(route + 'users/getAll')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, response) => {
                try {
                    const usersGet = JSON.parse(response.text).users;
                    this.setState({
                        users: usersGet
                    });
                } catch (error) {
                    console.log("Error: " + error);
                }
            });
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    handleDeleteUser({ target }){
        var response = prompt("Digite cualquier caracter para confirmar la eliminación");

        if(response !== null){
            try {
                request.delete(route + 'users/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query({
                    id: target.value
                })
                .end((err, response) => {
                    try {
                        const res = JSON.parse(response.text).user;

                        if(res === true){
                            alert("Eliminación exitosa")
                            this.getUsers();
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

    typeUser(userT){
        if(userT === 'student'){
            return 'Estudiante';
        }else if(userT === 'root'){
            return 'Administrador'
        }else{
            return 'Profesor'
        }
    }

    render(){
        return (
            <section>
                <Table className="table table-hover table-striped table-subject__items">
                    <thead>
                        <tr className="table-header-subject__items">
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Grado</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.grade}</td>
                                    <td>{this.typeUser(item.type_user)}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button type="button" value={item._id} className="btn btn-danger btndelete" data-placement="top" onClick={this.handleDeleteUser.bind(this)}><i title="Eliminar" className="fa fa-trash-alt"></i></button>
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