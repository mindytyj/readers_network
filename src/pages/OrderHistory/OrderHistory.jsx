import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory() {
  const user = useAtomValue(userAtom);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrderHistory() {
      try {
        const orderHistory = await requestHandler(
          `/api/orders/${user.id}`,
          "GET"
        );

        setOrders(orderHistory);
      } catch {
        console.error("Failed to retrieve order history.");
      }
    }
    getOrderHistory();
  }, []);

  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>My Order History</h4>
      </div>
      <div className="container border border-primary rounded">
        <div className="list-group mt-3 mb-3 overflow-y-auto groupsContainer rounded-0">
          {orders?.length > 0 ? (
            orders.map((book) => {
              return (
                <div key={book?.id}>
                  <OrderHistoryItem book={book} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">Order History is empty.</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
