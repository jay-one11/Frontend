import { useState } from "react";
function App() {
  const [Todo, setTodo] = useState("");
  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (Todo === "") {
      return;
    }
    setToDos((currentArray) => [Todo, ...currentArray]);
    setTodo("");
  };
  const [toDos, setToDos] = useState([]);
  console.log(toDos);
  return (
    <div>
      <h1>my To Dos({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={Todo}
          onChange={onChange}
          placeholder="Write your to do..."
        />
        <button>Add to do</button>
      </form>
      <hr />
      {toDos.map((cur, index) => (
        <li key={index}>
          {index + 1}. {cur}
        </li>
      ))}
    </div>
  );
}

export default App;
