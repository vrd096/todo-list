import { TaskType, Todolist } from "./Todolist"




function App() {

let tasks: TaskType[] = [
  {id: 1, title: "CSS", isDone: true},
  {id: 2, title: "JS", isDone: true},
  {id: 4, title: "React", isDone: false},
  {id: 5, title: "React", isDone: false},
  {id: 6, title: "React", isDone: false},
]

  function removeTask (id: number) {
    let resultTask = tasks.filter( (t) => {
      if ( t.id !== id){ 
        return true
      } else {
        return false
      }
    })
  }

  return (
    <div className="App">
    <Todolist  
    title="What to learn" 
    tasks={tasks}
    removeTask={removeTask}/>
    </div>
  )
}

export default App
