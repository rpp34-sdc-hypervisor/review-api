import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
  };

export default function () {
  const res = http.get('http://localhost:8000/reviews/meta?product_id=64625');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}


// const res = http.get('http://localhost:8000/reviews?product_id=64625');

