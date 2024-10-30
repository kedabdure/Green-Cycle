import { Chapa } from 'chapa-nodejs';
import axios from 'axios';

export const chapa = new Chapa({
  secretKey: process.env.CHAPA_SK,
});

export async function initializePayment({ first_name, last_name, email, phone_number, tx_ref, total }) {

  const callbackUrl = `${process.env.BASE_URL}/api/payment-callback`;
  const returnUrl = `${process.env.BASE_URL}/order-summary?tx_ref=${tx_ref}`;

  const totalAmount = total.toFixed(2);

  const initializeOptions = {
    first_name,
    last_name,
    email,
    phone_number,
    currency: 'ETB',
    amount: totalAmount.toString(),
    tx_ref,
    callback_url: callbackUrl,
    return_url: returnUrl,
    customization: {
      title: 'Test Payment',
      description: 'E-commerce Checkout Payment',
    },
  };

  try {
    const response = await chapa.initialize(initializeOptions);
    return response;
  } catch (error) {
    throw new Error("Chapa Payment Initialization Failed");
  }
}


// Function to verify a payment
export async function verifyPayment(tx_ref) {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SK}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
}
