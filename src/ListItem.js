import React from "react";

export default function ListItem({ item, index, onListItemClick }) {
  console.log("item: ", item);
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
