import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import WheelComponent from "react-wheel-of-prizes";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Modal from "./components/Modal";
import axios from "axios";
import { API_URL } from "./config";
import WinnerModal from "./components/WinnerModal";

const Spinner = () => {
  const { token } = useParams();
  const { width, height } = useWindowSize();
  const [itemsLoading, setItemsLoading] = useState(false);
  const [items, setItems] = useState({});
  const [finished, setFinished] = useState(false);
  const [winnerModal, setWinnerModal] = useState(false);
  const [winnerPrice, setWinnerPrice] = useState("");

  const [wheels, setWheels] = useState([]);
  const [wheelsLoading, setWheelsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const fetchWheels = async () => {
    setWheelsLoading(true);
    axios
      .get(`${API_URL}/wheels`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setWheels(data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setWheelsLoading(false);
      });
  };

  const fetchUser = async () => {
    setUserLoading(true);
    axios
      .get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setUser(data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setUserLoading(false);
      });
  };

  useEffect(() => {
    fetchWheels();
    fetchUser();
  }, []);

  const segments = useMemo(() => {
    const itemsArray = items?.items || [];
    const shuffledItems = [...itemsArray]?.sort(() => Math.random() - 0.5);
    return shuffledItems.map((item) => item?.name) || [];
  }, [items]);
  // const yourWinningSegmentVariable = useMemo(() => {
  //   const randomIndex = Math.floor(Math.random() * segments?.length);
  //   return segments?.[Math.random() * segments?.length];
  // }, [segments]);
  const segColors = [
    "#0b1725",
    "#fcbb0b",
    "#0b1725",
    "#fcbb0b",
    "#0b1725",
    "#fcbb0b",
  ];
  const onFinished = async (winner) => {
    if (winner) {
      setWinnerModal(true);
      setWinnerPrice(winner);
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
      id: Number(items?.id),
    };
    await axios
      .post(`${API_URL}/wheels/set-result`, params, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .finally(() => {
        if (!finished) {
          setTimeout(() => {
            setFinished(false);
            window.location.reload();
          }, [5000]);
        }
      });
  };

  const fetchItems = async (id) => {
    setItemsLoading(true);
    axios
      .get(`${API_URL}/wheels/get-items?id=${id}`, {
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
  const yourWinningSegmentVariable = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * segments.length);
    return segments[randomIndex];
  }, [segments]);
  console.log(yourWinningSegmentVariable);
  //

  return (
    <>
      <div className="spin-container">
        {finished && (
          <Confetti
            style={{ zIndex: "99999999999" }}
            width={width}
            height={height}
          />
        )}

        {itemsLoading ? (
          "Loading..."
        ) : (
          <>
            <div style={{ color: "#fff" }}>
              ID: {userLoading ? "Loading..." : user?.id}
            </div>
            <div style={{ marginBottom: "2rem", color: "#fff" }}>
              Umumiy ball: {userLoading ? "Loading..." : user?.cashback}
            </div>
            <WheelComponent
              segments={segments}
              segColors={segColors}
              // winningSegment={"Велосипед"}
              onFinished={onFinished}
              primaryColor="#fcbb0b"
              contrastColor="#fff"
              buttonText=""
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
            : wheels?.map(
                (item, idx) =>
                  item?.active && (
                    <button
                      className={`${!item?.active && "disactive-button"}`}
                      onClick={() => {
                        if (item?.active) {
                          openModal(item?.id);
                        } else {
                          alert("Это не активный");
                        }
                      }}
                      key={idx}
                    >
                      {item?.min_balance}
                    </button>
                  )
              )}
        </div>
        {/* <button className="spin-button">Получить</button> */}
      </div>
      <Modal
        active={modal}
        handleClick={handleSuccessModal}
        onClose={closeModal}
      />
      <WinnerModal active={winnerModal} price={winnerPrice} />
    </>
  );
};

export default Spinner;
