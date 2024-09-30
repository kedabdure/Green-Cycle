import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SK,
});

export async function initializePayment({ first_name, last_name, email, phone_number }) {
  const tx_ref = await chapa.genTxRef();

  const initializeOptions = {
    first_name,
    last_name,
    email,
    phone_number,
    currency: 'ETB',
    amount: '1',
    tx_ref,
    callback_url: `${process.env.BASE_URL}/payment-callback`,
    return_url: `${process.env.BASE_URL}/payment-status`,
    customization: {
      title: 'Test Payment',
      description: 'E-commerce Checkout Payment',
    },
  };

  try {
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
