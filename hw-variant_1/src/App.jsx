import { useState } from 'react'
import './App.css'

import TodoList from './TodoList'
import ProfileEditor from './ProfileEditor'
import ClickTracker from './ClickTracker'

function App() {

  const [todos, setTodos] = useState([
    { text: 'a', done: true, id: 1 },
    { text: 'b', done: false, id: 2 },
    { text: 'c', done: true, id: 3 },
    { text: 'd', done: false, id: 4 },
  ])

  const onDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
    console.log(...newTodos)
  }

  return (
    <>
      <TodoList todos={todos} onDelete={onDelete}/>
      <ProfileEditor name='Abby' bio='My bio bla bla' />
      <ClickTracker />
    </>
  )
}

export default App
