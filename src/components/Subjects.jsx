import React, { Component } from 'react';
import SubjectItem from './SubjectItem';
import '../assets/styles/components/Subjects.scss';

export default class Sidebar extends Component{
    
    render(){
        return(
            <aside className="sidebar-section">
                <SubjectItem toSearch={this.props.toSearch}/>
            </aside>
        );
    };
}