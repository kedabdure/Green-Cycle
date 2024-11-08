import emailjs from '@emailjs/browser';

export const sendEmail = async (templateParams) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    return false;
  }
};
