export default function PaymentButton({ handleSubmit, error }) {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Pay Now
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <span className="text-center text-danger">{error}</span>
      </div>
    </div>
  );
}
