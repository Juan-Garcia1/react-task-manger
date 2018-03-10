import React, { Component } from 'react';

import Tasks from './components/Tasks/Tasks'
import TaskInfo from './components/TaskInfo/TaskInfo'
import AddTaskForm from './components/AddTaskForm/AddTaskForm'

import './App.css'

import firebase from './firebase'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  state = {
    tasks: [],
    searchTaskValue: ''
  }

  componentDidMount() {
    const tasksRef = firebase.database().ref('tasks')
    tasksRef.on('value', (snapshot) => {
      let tasks = snapshot.val()
      let newTasks = []
      for(let task in tasks) {
        newTasks.push({
          id: task,
          task: tasks[task].task,
          type: tasks[task].type,
          description: tasks[task].description,
          completed: tasks[task].completed
        })
      }
      this.setState({
        tasks: newTasks
      })
    })

  }

  addTask = (task, type, description) => {
    const tasksRef = firebase.database().ref('tasks')
    const Task = {
      task: task,
      type: type,
      description: description,
      completed: false
    }
    tasksRef.push(Task)
  }

  deleteTask = (id) => {
    const taskRef = firebase.database().ref(`/tasks/${id}`)
    taskRef.remove()
  }

  saveEditTask = (id, type, task, description) => {
    firebase.database().ref(`/tasks/${id}/`).update({
      type: type,
      task: task,
      description: description
    }) 
  }

  completeTask = (id) => {
    firebase.database().ref(`/tasks/${id}`).update({
      completed: true
    })
  }
  
  render() {
    const { tasks } = this.state
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' render={() => <Tasks 
            tasks={tasks}
            />}/>
            <Route path='/task/:id' render={(props) => <TaskInfo 
            {...props}
             deleteTask={this.deleteTask}
             saveEditTask={this.saveEditTask}
             completeTask={this.completeTask}
             />
            }
              />
            <Route path="/addTask" render={() => <AddTaskForm addTask={this.addTask}/> }/>
          </Switch>
        </Router>
      </div>
    );
  }
}



export default App;