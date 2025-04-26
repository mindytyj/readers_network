export default function BillingAddressForm({ paymentInfo, handleChange }) {
  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="firstName" className="form-label">
          First Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={paymentInfo.firstName}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="lastName" className="form-label">
          Last Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={paymentInfo.lastName}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <label htmlFor="address" className="form-label">
          Address <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          placeholder="Street Name, Building"
          value={paymentInfo.address}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <label htmlFor="address2" className="form-label">
          Address 2
        </label>
        <input
          type="text"
          className="form-control"
          id="address2"
          name="address2"
          placeholder="Apartment, Floor or Unit Number"
          value={paymentInfo.address2}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="city" className="form-label">
          City <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={paymentInfo.city}
          required
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={paymentInfo.state}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="zipCode" className="form-label">
          Zip Code <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="zipCode"
          name="zipCode"
          value={paymentInfo.zipCode}
          required
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
