import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function PaymentStatus() {
  const [status, setStatus] = useState('');
  const router = useRouter();
  const { tx_ref } = router.query;

  useEffect(() => {
    if (tx_ref) {
      axios
        .post('/api/verify-payment', { tx_ref })
        .then((res) => setStatus(res.data.status))
        .catch((err) => setStatus('failed'));
    }
  }, [tx_ref]);

  return (
    <div>
      <h1>Payment Status: {status}</h1>
    </div>
  );
}
