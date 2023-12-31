import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  return (
    <div>
      <RenderMultipleThings />
    </div>
  );
}

//[1, 2, 3].map((item) => `the number is ${item}`) // returns ["the number is 1", "the number is 2", "the number is 3"]

// [1, 2, 3].map((item) => <div>{item}</div>); // returns [<div>1</div>, <div>2</div>, <div>3</div>]

function RenderMultipleThings() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const addNewItemToItems = async () => {
    await axios.post("http://localhost:3000", { value });
    setItems([...items, value]);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const loadItemsToItems = async () => {
    const response = await axios.get("http://localhost:3000", {
      params: {
        value: "",
      },
    });

    setValue(response.data);
    console.log(response.value);
  };

  return (
    <>
      <div>
        <label>
          Thing to do:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <button onClick={addNewItemToItems}>Create New Thing</button>
        <button onClick={loadItemsToItems}>Load Things</button>
      </div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}

export default App;
