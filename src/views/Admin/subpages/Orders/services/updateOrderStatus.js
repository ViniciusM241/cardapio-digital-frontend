import client from '~/boot/client';

export default async function (id) {
  const res = await client.patch(`/orders/${id}/status`);

  return res.data;
}
