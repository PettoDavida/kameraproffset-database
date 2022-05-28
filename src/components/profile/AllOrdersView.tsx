import { useState } from "react";

interface Orders {
  userID: string;
}

export default function AllOrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  let headers: RequestInit = {
    method: "GET",
  };
  fetch("http://localhost:3000/api/order", headers)
    .then((res: Response) => {
      if (res.status === 500) {
        return Promise.reject("Internal server error");
      } else if (res.status === 400) {
        return Promise.reject("oldPassword and newPassword required");
      }

      return res.json();
    })
    .then((data) => {
      setOrders(data);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(orders);

  return <div></div>;
}
