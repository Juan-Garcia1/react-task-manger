import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import './AddTaskForm.css'

const propTypes = {
    addTask: PropTypes.func
}

class AddTaskForm extends Component {
    state = {
        reDirect: false
    }
    addTask = (e) => {
        e.preventDefault()
        const { addTask } = this.props
        const task = e.target.task.value
        const description = e.target.description.value
        const type = e.target.type.value
        if(!task || !description || !type) {
            return null
        } else {
            addTask(task, type, description)
            this.setState({
                reDirect: true
            })
        }

        e.target.reset()
    }
    render() {
        const { reDirect } = this.state
        return (
            <form className='form' onSubmit={this.addTask}>
                <select name='type'>
                    <option value=''>Type</option>
                    <option value='Personal'>Personal</option>
                    <option value='Business'>Business</option>
                </select>
                <input type='text' name='task' placeholder='Task' />
                <input type='text' name='description' placeholder='Description' />
                <button>Add task</button>
                {   //when form is submitted, redirect to tasks
                    reDirect && <Redirect to='/'/>
                }
            </form>
        )
    }
}

AddTaskForm.propTypes = propTypes

export default AddTaskForm