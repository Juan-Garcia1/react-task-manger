import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Tasks.css'

import Task from '../Task/Task'
import { Link } from 'react-router-dom'

const centerMessage = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

const propTypes = {
    tasks: PropTypes.array
}

class Tasks extends Component {

    render() {
        const { tasks } = this.props

        const TypeCount = (task, type) => <p>{task.filter(t => t.type === type).length} <span>{type}</span></p>
        const totalPersonal = TypeCount(tasks, 'Personal')
        const totalBusiness = TypeCount(tasks, 'Business')

        const totalTask = tasks.length
        let completedTask = tasks.filter(t => t.completed === true).length
        const completedPercentage = (completedTask / totalTask * 100).toFixed(0)

        return (
            <div id='main'>
                <header id='main-header'>
                    <div className='type-of-tasks'>
                        {totalPersonal} 
                        {totalBusiness}
                    </div>
                    <div className='task-completion'>
                        <span>{completedPercentage === 'NaN' ? 0 : completedPercentage}% done</span>
                    </div>
                    </header>
                {
                    tasks.length <= 0  
                    ? 
                    <p style={centerMessage}>Add a task</p> 
                    :
                    <ul id='tasks-list'>
                        {
                            tasks.map(task => <Link key={task.id} to={`/task/${task.id}`}> <Task {...task} /> </Link>)
                        }
                    </ul>
                }
                <footer>
                    {
                        tasks.length !== 0 &&
                        <p>Completed: <span>{tasks.reduce((acc, val) => acc + val.completed, 0)}</span></p>
                    }
                    <Link to='/addTask'>+</Link>
                </footer>
            </div>
        )
    }
} 

Tasks.propTypes = propTypes

export default Tasks