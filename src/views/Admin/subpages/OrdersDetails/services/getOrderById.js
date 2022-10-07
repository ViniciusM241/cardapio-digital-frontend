import client from '~/boot/client';

export default async function (id) {
  const res = await client.get(`/orders/${id}`);

  return res.data;
}
