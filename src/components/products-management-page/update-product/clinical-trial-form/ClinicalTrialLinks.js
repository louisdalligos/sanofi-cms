import React, { useState, useEffect } from "react";
import { Row, Button, Spin, Modal, message } from "antd";
import { useDrop } from "react-dnd";

import LinkItem from "./LinkItem";
import update from "immutability-helper";

const style = {
  width: 400,
  marginTop: 30
};

// Component
const ClinicalTrialLinks = ({ ...props }) => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "Write a cool JS library"
      },
      {
        id: 2,
        text: "Make it generic enough"
      },
      {
        id: 3,
        text: "Write README"
      },
      {
        id: 4,
        text: "Create some examples"
      }
    ]);
    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        })
      );
    };
    return (
      <div style={style}>
        {cards.map((card, i) => (
          <LinkItem
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        ))}
      </div>
    );
  }
};

export default ClinicalTrialLinks;
