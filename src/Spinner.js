import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import WheelComponent from "react-wheel-of-prizes";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Modal from "./components/Modal";
import axios from "axios";

const Spinner = () => {
  const { token } = useParams();
  const { width, height } = useWindowSize();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [items, setItems] = useState({});
  const [finished, setFinished] = useState(false);

  const [wheels, setWheels] = useState([]);
  const [wheelsLoading, setWheelsLoading] = useState(false);
  const fetchWheels = async () => {
    setWheelsLoading(true);
    axios
      .get("/wheels", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setWheels(data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setWheelsLoading(false);
      });
  };

  useEffect(() => {
    fetchWheels();
  }, []);

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
  const onFinished = async (winner) => {
    console.log(winner);
    if (winner) {
      setFinished(true);
      setTimeout(() => {
        setFinished(false);
      }, [5000]);
    }
    const winnerItemId = items?.items?.find(
      (item) => item?.name === winner
    )?.id;

    const params = {
      item_id: Number(winnerItemId),
      wheel_id: Number(items?.wheel?.id),
    };
    await axios
      .post(`https://novey-up.uz/api/wheels/set-result`, params, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .finally(() => window.location.reload());
  };

  const fetchItems = async (id) => {
    setItemsLoading(true);
    axios
      .get(`/wheels/get-items?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setItems(data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemsLoading(false);
      });
  };

  // useEffect(() => {
  //   fetchItems(id);
  // }, [id]);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const openModal = (id) => {
    setModal(true);
    setId(id);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleSuccessModal = async () => {
    closeModal();
    await fetchItems(id);
    alert("Крутите барабан");
  };

  return (
    <>
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
              onFinished={onFinished}
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
        <div className="buttons">
          {wheelsLoading
            ? "Loading..."
            : wheels?.map((item, idx) => (
                <button onClick={() => openModal(item?.id)} key={idx}>
                  {item?.name}
                </button>
              ))}
        </div>
        {/* <button className="spin-button">Получить</button> */}
      </div>
      <Modal
        active={modal}
        handleClick={handleSuccessModal}
        onClose={closeModal}
      />
    </>
  );
};

export default Spinner;
