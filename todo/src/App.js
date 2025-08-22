import { useState } from "react";
import "./App.css";

function App() {
  const [todolist, setTodolist] = useState([]);
  return (
    <>
      <Todos todolist={todolist} setTodolist={setTodolist}/>
      <TodoForm todolist={todolist} setTodolist={setTodolist} />
    </>
  );
}

function Todos({todolist, setTodolist}) {
  function removefromtodolist(index){
    let newlist = [...todolist];
    newlist.splice(index, 1);
    setTodolist(newlist);
  }
  return (
    <ol>
      {todolist.map((todo, index) => {
        return <li key={index}>{todo} <button onClick={() => removefromtodolist(index)}>🗑️</button></li>;
      })}
    </ol>
  );
}

function TodoForm({todolist, setTodolist}) {
  const [task, setTask] = useState("");
  function addtask(e) {
    e.preventDefault();
    let newtodolist = [...todolist];
    newtodolist.push(task);
    setTodolist(newtodolist);
  }
  return (
    <form onSubmit={e => task?addtask(e):e.preventDefault()}>
      <label
        htmlFor="task"
      >
        Add a new task :{" "}
      </label>
      <input type="text" id="task" onChange={(e) => {
          setTask(e.target.value);
        }}/>
      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default App;
