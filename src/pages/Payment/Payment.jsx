import PaymentDetails from "./PaymentDetails";

export default function Payment() {
  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>Make Payment</h4>
      </div>
      <div className="container">
        <PaymentDetails />
      </div>
    </div>
  );
}
