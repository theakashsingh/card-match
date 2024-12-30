import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [previousCard, setPreviousCard] = useState(null);

  const onClickHandler = (currentId) => {
    const currentCard = cardList.find((card) => card.id === currentId);

    if (currentCard.isOpen) return;

    const newList = cardList.map((card) =>
      card.id === currentId ? { ...card, isOpen: true } : card
    );
    if (previousCard) {
      if (previousCard.name === currentCard.name) {
        setCardList(newList);
      } else {
        setCardList(newList);
        setTimeout(() => {
          setCardList(
            cardList.map((card) =>
              card.id === currentId || card.id === previousCard.id
                ? { ...card, isOpen: false }
                : card
            )
          );
        }, 1000);
      }
      setPreviousCard(null);
    } else {
      setPreviousCard(currentCard);
      setCardList(newList);
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
