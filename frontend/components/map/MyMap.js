// components/MyGoogleMap.js
import { Box } from '@mui/material';

const MyGoogleMap = () => {
  return (
    <Box
      component="iframe"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1179.3612903027195!2d38.73476162034352!3d8.925559937733116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b81338f952f9f%3A0xdbb133c2491ab69f!2zSGFpbGUgR2FybWVudCB8IEF0aWtpbHQgVGVyYSB8IOGIgOGLreGIjCDhjIvhiK3hiJjhipXhibUgfCDhiqDhibXhiq3hiI3hibUg4Ymw4Yir!5e0!3m2!1sen!2set!4v1731017949989!5m2!1sen!2set"
      title="Google Maps Embed"
      sx={{
        width: '100%',
        height: { xs: '300px', sm: '400px', md: '450px' },
        border: 0,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default MyGoogleMap;
