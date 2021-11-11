import './Nav.css';
import React from 'react';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="#/tasks">
                <i className="fa fa-tasks"></i> Tarefas
            </a>
        </nav>
    </aside>