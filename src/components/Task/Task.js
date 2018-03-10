import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

const propTypes = {
    completed: PropTypes.bool,
    task: PropTypes.string,
    type: PropTypes.string
}

export default class Task extends Component {
    render() {
        const { task, type, completed } = this.props
        // add complete class is task is completed
        const completedClassName = completed ? 'complete' : ''
        return (
            <li>
                <div>
                    {
                        type === 'Personal' ?
                        <i className="fa fa-user-o"></i> :
                        type === 'Business' ?
                        <i className="fa fa-building-o"></i> : ''
                    }
                </div>
                <p className={completedClassName}> {task} <span>{type}</span></p>
            </li>
        )
    }
}

Task.propTypes = propTypes