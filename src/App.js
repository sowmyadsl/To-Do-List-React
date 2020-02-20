import React from "react";
import "./styles.css";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItem: [], inputValue: "" };
    this.addToList = this.addToList.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }

  addToList() {
    const { listItem, inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    const item = {
      text: inputValue,
      clicked: false
    };
    listItem.push(item);
    this.setState({ listItem });
    console.log(listItem);
  }

  updateInputValue(e) {
    this.setState({ inputValue: e.target.value });
  }

  onListItemClick(i) {
    const { listItem } = this.state;
    const item = listItem[i];
    const modifiedItem = {
      text: item.text,
      clicked: !item.clicked
    };
    console.log("modifiedItem:", modifiedItem);
    const modifiedList = listItem.map((item, index) => {
      if (index === i) {
        item = modifiedItem;
      }
      return item;
    });
    this.setState({ listItem: modifiedList });
  }

  render() {
    const { listItem, inputValue } = this.state;
    const displayList = listItem.map((item, i) => (
      <ListItem item={item} index={i} onListItemClick={this.onListItemClick} />
    ));
    let completedCount = 0;
    for (let i = 0; i < listItem.length; i++) {
      if (listItem[i].clicked) {
        completedCount++;
      }
    }

    return (
      <div>
        <div>
          <h2>Todo List</h2>
          <input value={inputValue} onChange={this.updateInputValue} />
          <button onClick={this.addToList}>Add</button>
          {listItem && <ul>{displayList}</ul>}
          {`${completedCount} complete of ${listItem.length} tasks`}
        </div>
        <style>{`
                  .is-done {
                      text-decoration: line-through;
                  }
              `}</style>
      </div>
    );
  }
}

export function ListItem({ item, index, onListItemClick }) {
  return (
    <li
      key={index}
      className={item.clicked ? "is-done" : ""}
      onClick={() => onListItemClick(index)}
    >
      {item.text}
    </li>
  );
}
