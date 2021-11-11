import React, { Component } from "react";
import Main from '../template/Main';
import axios from 'axios';

const headerProps = {
    icon: 'tasks',
    title: 'Tarefas',
    subtitle: 'Cadastro de tarefas: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/tasks';
const initialState = {
    task: { name: '', date: '', time: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState };

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        })
    }

    clear() {
        this.setState({ task: initialState.task });
    }

    save() {
        const task = this.state.task;
        const method = task.id ? 'put' : 'post';
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl;
        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ task: initialState.task, list })
            })
    }

    getUpdatedList(task, add = true) {
        const list = this.state.list.filter(t => t.id !== task.id);
        if(task) list.unshift(task);
        return list;
    }

    updateField(event) {
        const task = { ...this.state.task };
        task[event.target.name] = event.target.value;
        this.setState( { task });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data</label>
                            <input type="text" className="form-control"
                            name="date"
                            value={this.state.task.date}
                            onChange={e => this.updateField(e)}
                            placeholder="Insira a data da tarefa." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Horário</label>
                        <input type="text" className="form-control"
                            name="time"
                            value={this.state.task.time}
                            onChange={e => this.updateField(e)}
                            placeholder="Insira o horário da tarefa." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Tarefa</label>
                        <input type="text" className="form-control"
                            name="name"
                            value={this.state.task.name}
                            onChange={e => this.updateField(e)}
                            placeholder="Insira a tarefa." />
                        </div>
                    </div>

                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(task) {
        this.setState({ task });
    }

    remove(task) {
        axios.delete(`${baseUrl}/${task.id}`).then(resp => {
            const list = this.getUpdatedList(task, false);
            this.setState({ list });
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Tarefa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(task => {
            return (
                <tr key={task.id}>
                    <td>{task.date}</td>
                    <td>{task.time}</td>
                    <td>{task.name}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(task)}>
                            <i className="fa fa-pencil"></i>
                        </button> <button className="btn btn-danger" onClick={() => this.remove(task)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}