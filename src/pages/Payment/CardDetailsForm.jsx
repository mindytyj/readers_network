export default function CardDetailsForm({ paymentInfo, handleChange }) {
  return (
    <form className="row g-3 mb-4">
      <div className="col-md-6">
        <label htmlFor="cardName" className="form-label">
          Name on Card <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="cardName"
          name="cardName"
          value={paymentInfo.cardName}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="cardNumber" className="form-label">
          Card Number <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="expiryDate" className="form-label">
          Expiry Date (MM/YY) <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="expiryDate"
          name="expiryDate"
          value={paymentInfo.expiryDate}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="cvv" className="form-label">
          CVV <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          name="cvv"
          value={paymentInfo.cvv}
          required
          minLength={3}
          maxLength={4}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
