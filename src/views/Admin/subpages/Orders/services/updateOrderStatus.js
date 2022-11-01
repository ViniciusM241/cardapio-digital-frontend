import client from '~/boot/client';

export default async function (id) {
  const res = await client.patch(`/orders/${id}/status`);

  if (res.status === 204)
    return true;
  else
    return false;
}
