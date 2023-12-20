import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import WheelComponent from "react-wheel-of-prizes";
import { api } from "./api";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Spinner = () => {
  const { id } = useParams();
  const { width, height } = useWindowSize();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [items, setItems] = useState({});
  const [finished, setFinished] = useState(false);

  const segments = useMemo(() => {
    return items?.items?.map((item) => item?.name) || [];
  }, [items]);
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
    setFinished(true);
    setTimeout(() => {
      setFinished(false);
    }, [5000]);
    console.log(winner);
  };

  const fetchItems = async (id) => {
    setItemsLoading(true);
    api
      .get(`/wheels/get-items?id=${id}`)
      .then(({ data }) => {
        setItems(data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemsLoading(false);
      });
  };

  useEffect(() => {
    fetchItems(id);
  }, [id]);
  console.log(items);

  return (
    <div className="spin-container">
      {finished && <Confetti width={width} height={height} />}

      {itemsLoading ? (
        "Loading..."
      ) : (
        <>
          <div>ID: 1</div>
          <div style={{ marginBottom: "2rem" }}>Обший балл: 100</div>
          <WheelComponent
            segments={segments}
            segColors={segColors}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            contrastColor="white"
            buttonText="Крутить"
            isOnlyOnce={false}
            // size={150}
            upDuration={100}
            downDuration={1000}
            fontFamily="Arial"
          />
        </>
      )}
      {/* <button className="spin-button">Получить</button> */}
    </div>
  );
};

export default Spinner;
