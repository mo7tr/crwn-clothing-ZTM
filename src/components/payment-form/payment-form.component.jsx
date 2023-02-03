import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.style";

function PaymentForm() {
  const stripe = useStripe();

  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }), // = 100$
    }).then((res) => {
      res.json();
    });

    console.log("response =>", response);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;
