import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [editID, setEditID] = useState(null);
  const [todolist, setTodolist] = useState(() => {
    const savedlist = localStorage.getItem('toDoList');
    return savedlist ? JSON.parse(savedlist) : []
  });

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(todolist));
  }, [todolist]);

  return (
    <>
      <div>
        <h1>Sarthak's todo list</h1>
        <Todos todolist={todolist} setTodolist={setTodolist} setEditID={setEditID} editID={editID}/>
        <EditForm editID={editID} setEditID={setEditID} todolist={todolist} setTodolist={setTodolist}/>
      </div>
      <AddForm todolist={todolist} setTodolist={setTodolist} />
    </>
  );
}

function Todos({todolist, setTodolist, setEditID, editID}) {
  function removefromtodolist(index){
    if(editID === index) setEditID(null);
    let newlist = [...todolist];
    newlist.splice(index, 1);
    setTodolist(newlist);
  }
  return (
    <ol>
      {todolist.map((todo, index) => {
        return <li key={index}>{todo} <button onClick={()=>setEditID(index)}>✏️</button><button onClick={() =>  removefromtodolist(index)}>🗑️</button></li>;
      })}
    </ol>
  );
}

function AddForm({todolist, setTodolist}) {
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

function EditForm({todolist, setTodolist, editID, setEditID}) {
  const [task, setTask] = useState("");
  function editTask(e, newtask) {
    e.preventDefault();
    let newtodolist = [...todolist];
    newtodolist[editID] = newtask;
    setTodolist(newtodolist);
    setEditID(null);
  }
  return (
    editID !== null?<form onSubmit={e => task?editTask(e, task):e.preventDefault()}>
      <label
        htmlFor="task"
      >
        Edit task #{editID+1}:{" "}
      </label>
      <input type="text" id="task" onChange={(e) => {
          setTask(e.target.value);
        }}/>
      <button type="submit">
        Edit
      </button>
    </form>:null
  );
}

export default App;
