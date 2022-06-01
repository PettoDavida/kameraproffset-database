import { useEffect, useState } from "react";
import "../CSS/confirmationPage.css";
import {
  getCurrentUser,
  getOrderById,
  getUserById,
  UserBackend,
} from "../utils/backend";

function Confirmation() {
  const [user, setUser] = useState<UserBackend>();
  let getURL = window.location.href;

  let decodedURL = decodeURI(getURL);
  let orderId = decodedURL.split("/").pop();

  const updateUser = async () => {
    let res = await getOrderById(String(orderId));
    let order = await res.json();
    console.log(order);

    res = await getUserById(order.userID);
    let user = await res.json();
    setUser(user);
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="checkout">
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div>
            <img
              id={"logo"}
              src={require("../assets/img/logo.png")}
              alt="logo"
            />
          </div>
          <div>
            <p>Tack för ditt köp</p>
            <p>{user !== undefined ? user.email : ""}</p>

            <p>Ordernummer:</p>
            <p>{orderId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
