import React from "react";
import "./App.css";

import WheelComponent from "react-wheel-of-prizes";
import axios from "axios";

const App = () => {
  const segments = [
    "Iphone 14 Pro Max",
    "Смартфон - Samsung Galaxy 23 Ultra",
    "Умра зиёрати 2 кишилик",
    "Ноутбук Apple MacBook Pro 13",
    "Беговая дорожка PowerGym PG-760",
    "Электромобиль BYD",
    "Квартира в Ташкенте, 2-ух комнатная",
    "Путевка в Египет на 2х 2х на 5 дней",
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };

  const fetchData = () => {
    axios.get('')
  };

  return (
    <div className="spin-container">
      <div>ID: 1</div>
      <div style={{ marginBottom: "2rem" }}>Обший балл: 100</div>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="Iphone 14 Pro Max"
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        // size={150}
        upDuration={100}
        downDuration={1000}
        fontFamily="Arial"
      />
      {/* <button className="spin-button">Получить</button> */}
    </div>
  );
};

export default App;
