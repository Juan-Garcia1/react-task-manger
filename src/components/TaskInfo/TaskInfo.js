import React, { Component } from 'react'
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types'
import './TaskInfo.css'

import firebase from '.../../firebase'

const propTypes = {
    deleteTask: PropTypes.func,
    saveEditTask: PropTypes.func,
    completeTask: PropTypes.func
}

class TaskInfo extends Component {
    state = {
        taskInfo: [],
        isEdit: false,
        deletedTask: false,
        isComplete: false
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props
        const tasksRef = firebase.database().ref('tasks')
        const getId = tasksRef.child(id)

        getId.on('value', snapshot => {
            this.setState({
                taskInfo: [snapshot.val()]
            })
        })

    }

    deleteTask = () => {
        const { deleteTask, match: { params: { id } } } = this.props
        deleteTask(id)
        this.setState({
            deletedTask: true
        })
    }

    goBack = () => {
        this.props.history.goBack()
    }

    editTask = () => {
        this.setState({
            isEdit: true
        })
    }

    saveEditTask = (e) => {
        e.preventDefault()

        const { saveEditTask, match: { params: { id } } } = this.props

        const editTask = e.target.editTask.value
        const editDescription = e.target.editDescription.value
        const editType = e.target.editType.value
        
        if(!editTask || !editDescription || !editType) {
            return null
        } else {
            saveEditTask(id, editType, editTask, editDescription)
            this.setState({
                isEdit: false
            })
        }

    }

    completeTask = () => {
        const { completeTask, match: { params: { id } } } = this.props
        completeTask(id)
        this.setState({
            isComplete: true
        })
    }


    render() {
        const { taskInfo, isEdit, deletedTask, isComplete } = this.state
        const { match: { params: { id } } } = this.props 
        return (
            <div id='task-info'>
                <header id='task-info-header'>
                    <button onClick={this.goBack}><i className='fa fa-long-arrow-left'></i></button>
                    {
                        !isEdit &&
                        <button onClick={this.editTask}><i className='fa fa-pencil'></i></button>
                    }
                </header>
                <ul id='task-info-list'>
                    {
                        deletedTask || isComplete ?
                        <Redirect to='/' />
                        :
                        taskInfo.map(t => (
                            isEdit 
                            ?
                            <form className='form' key={id} onSubmit={this.saveEditTask}>
                                <select name='editType' defaultValue={t.type}>
                                    <option value=''>Type</option>
                                    <option value='Personal'>Personal</option>
                                    <option value='Business'>Business</option>
                                </select>
                                <input defaultValue={t.task} name="editTask" />
                                <input type='text' defaultValue={t.description} name="editDescription" />
                                <button>Save</button>
                            </form>
                            :
                            <li key={id}>
                                <div>
                                    <p>{t.task} <span>{t.type}</span></p>
                                    <p>{t.description}</p>
                                    <div id='task-info-btns'>
                                        <button onClick={this.deleteTask}>Delete</button>
                                        {
                                            // hide complete button if task is completed
                                            !t.completed && 
                                            <button onClick={this.completeTask}>Complete</button>
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    
                    }
                </ul>

            </div>

        )
    }
}

TaskInfo.propTypes = propTypes

export default TaskInfo