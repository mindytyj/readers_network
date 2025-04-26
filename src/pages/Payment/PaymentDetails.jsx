import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import BillingAddressForm from "./BillingAddressForm";
import CardDetailsForm from "./CardDetailsForm";
import PaymentButton from "./PaymentButton";

export default function PaymentDetails() {
  const user = useAtomValue(userAtom);
  const [paymentInfo, setPaymentInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setPaymentInfo({ ...paymentInfo, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (
      paymentInfo.firstName === "" ||
      paymentInfo.lastName === "" ||
      paymentInfo.address === "" ||
      paymentInfo.city === "" ||
      paymentInfo.zipCode === ""
    ) {
      setError(
        "Billing Address is incomplete. Please fill out the required fields."
      );
      return;
    }

    if (
      paymentInfo.cardName === "" ||
      paymentInfo.cardNumber === "" ||
      paymentInfo.expiryDate === "" ||
      paymentInfo.cvv === ""
    ) {
      setError(
        "Payment Information is incomplete. Please fill out the required fields."
      );
      return;
    }

    if (
      !paymentInfo.firstName.match(/^[^!-/:-@[-`{-~\s][\w\s\-,()]+$/) ||
      !paymentInfo.lastName.match(/^[^!-/:-@[-`{-~\s][\w\s\-,()]+$/)
    ) {
      setError("Invalid First or Last Name in Billing Address.");
      return;
    }

    if (
      !paymentInfo.address.match(/^[^!-/:-@[-`{-~\s][a-zA-Z\d,\s#-]+$/) &&
      paymentInfo.address2 !== "" &&
      !paymentInfo.address2.match(/^[^!-/:-@[-`{-~\s][a-zA-Z\d,\s#-]+$/)
    ) {
      setError("Invalid Address in Billing Address.");
      return;
    }

    if (
      !paymentInfo.city.match(/^[^!-/:-@[-`{-~\s][a-zA-Z,\s]+$/) ||
      (paymentInfo.state !== "" &&
        !paymentInfo.state.match(/^[^!-/:-@[-`{-~\s][a-zA-Z,\s]+$/))
    ) {
      setError("Invalid City or State in Billing Address.");
      return;
    }

    if (!paymentInfo.zipCode.match(/^[\d-?]{5,10}$/)) {
      setError("Invalid Zip Code in Billing Address.");
      return;
    }

    if (!paymentInfo.cardName.match(/^[^!-/:-@[-`{-~\s][\w\s\-,()]+$/)) {
      setError("Invalid Name on Card in Payment Information.");
      return;
    }

    if (
      !paymentInfo.cardNumber.match(/^[\d]{16}$/) &&
      !paymentInfo.cardNumber.match(/^[\d-]{5}[\d-]{5}[\d-]{5}[\d]{4}$/)
    ) {
      setError("Invalid Card Number in Payment Information.");
      return;
    }

    if (!paymentInfo.expiryDate.match(/^[\d]{2}[/][\d]{2}$/)) {
      setError("Invalid Expiry Date in Payment Information.");
      return;
    }

    if (!paymentInfo.cvv.match(/^[\d]{3,4}$/)) {
      setError("Invalid CVV in Payment Information.");
      return;
    }

    try {
      const paymentData = { ...paymentInfo };

      await requestHandler(`/api/orders/payment/${user.id}`, "POST", {
        paymentData,
      });

      navigate(`/orders/${user.id}`);
    } catch (err) {
      setError("Unable to make payment. Please try again later.");
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h5>Billing Address</h5>
      </div>
      <BillingAddressForm
        paymentInfo={paymentInfo}
        handleChange={handleChange}
      />
      <div className="mt-4 mb-4">
        <h5>Payment Information</h5>
      </div>
      <CardDetailsForm paymentInfo={paymentInfo} handleChange={handleChange} />
      <PaymentButton handleSubmit={handleSubmit} error={error} />
    </div>
  );
}
