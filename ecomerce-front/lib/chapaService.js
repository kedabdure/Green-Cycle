import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SK,
});

export async function initializePayment({ first_name, last_name, email, phone_number, amount }) {
  const tx_ref = await chapa.genTxRef();

  const initializeOptions = {
    first_name,
    last_name,
    email,
    phone_number,
    currency: 'ETB',
    amount: amount.toString(),
    tx_ref,
    callback_url: 'https://localhost:3000/payment-callback',
    return_url: 'https://localhost:3000/payment-status',
    customization: {
      title: 'Test Payment',
      description: 'E-commerce Checkout Payment',
    },
  };

  try {
    // Log the request options
    console.log("Initialize Options:", initializeOptions);

    const response = await chapa.initialize(initializeOptions);
    
    // Log the full response for debugging
    console.log("Chapa Initialize Response:", response);

    return response;
  } catch (error) {
    console.error("Chapa Initialization Error:", error);
    throw new Error("Chapa Payment Initialization Failed");
  }
}


// Function to verify a payment
export async function verifyPayment(tx_ref) {
  const response = await chapa.verify({ tx_ref });
  return response;
}
