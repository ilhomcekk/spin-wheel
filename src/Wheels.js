import React, { useEffect, useState } from "react";
import { api } from "./api";
import { Link } from "react-router-dom";

const Wheels = () => {
  const [wheels, setWheels] = useState([]);
  const [wheelsLoading, setWheelsLoading] = useState(false);
  const fetchWheels = async () => {
    setWheelsLoading(true);
    api
      .get("/wheels")
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

  return (
    <div>
      <div>
        {wheelsLoading
          ? "Loading"
          : wheels?.map((item, idx) => (
              <Link to={`/spin/${item?.id}`} key={idx} className="wheel">
                {item?.name}
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Wheels;
