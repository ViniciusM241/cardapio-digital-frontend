import client from '~/boot/client';

export default async function (data, id) {
  const res = await client.patch(`/users/${id}`, data);

  if (res.status === 204)
    return true;

  return false;
}
