// Import Chapa class from chapa-nodejs
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SK,
});

// Generate transaction reference using our utility method or provide your own
const tx_ref = await chapa.genTxRef();

const response = await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  phone_number: '0911121314',
  currency: 'ETB',
  amount: '200',
  tx_ref: tx_ref,
  callback_url: 'https://localhost:3000/',
  return_url: 'https://localhost:3000/', // used to display the success or failure message
  customization: {   // additional detail for the checkout page
    title: 'Test Title',
    description: 'Test Description',
  },
});

console.log(response);