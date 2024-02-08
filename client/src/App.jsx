import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  return (
    <div>
      <RenderMultipleThings />
    </div>
  );
}

function TodoBubble({ index, item, removeItem }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={isChecked === true ? "finished" : "bubble"}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <h5>{item}</h5>
      <button onClick={() => removeItem(index)}>Delete</button>
    </div>
  );
}

// [1, 2, 3].map((item) => `the number is ${item}`) // returns ["the number is 1", "the number is 2", "the number is 3"]

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
    const response = await axios.get("http://localhost:3000");
    setItems(response.data);
  };

  const removeItem = async (index) => {
    await axios.delete("http://localhost:3000", { data: { index } });
    loadItemsToItems();
  };

  useEffect(() => {
    loadItemsToItems();
  }, []);

  return (
    <>
      <div className="todotext">
        <label>
          Thing to do:
          <input type="text" value={value} onChange={handleChange} />
        </label>
      </div>
      <div className="buttons">
        <button onClick={addNewItemToItems}>Create New Thing</button>
      </div>
      <div className="bubbleGroup">
        {items.map((item, index) => (
          <TodoBubble
            removeItem={removeItem}
            key={index}
            item={item}
            index={index}
          ></TodoBubble>
        ))}
      </div>
    </>
  );
}

export default App;
