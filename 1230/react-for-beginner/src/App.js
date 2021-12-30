import Button from "./Button";
import styles from "./App.modules.css";
import { useEffect, useState } from "react";

function Hello() {
  function destroyFn() {
    console.log("bye:(");
  }
  function createFn() {
    console.log("Hello:)");
    return destroyFn;
  }
  useEffect(createFn, []);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  // console.log("always");
  useEffect(() => {
    console.log("Call the API");
  }, []);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("search for " + keyword);
    }
  }, [keyword]);
  useEffect(() => {
    console.log("i run when 'counter' changed!");
  }, [counter]);

  const [showing, setShow] = useState(true);
  const oppositeShow = (prev) => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="search here.."
      />
      <br />
      <div>
        {showing ? <Hello /> : null}
        <button onClick={oppositeShow}>{showing ? "show" : "hide"}</button>
      </div>
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>click me</button>
      <Button text={"Conitnue"} />
    </div>
  );
}

export default App;
