import client from '~/boot/client';

export default async function() {
  const res = await client.get('/wa-client/status');

  return res.data;
}
