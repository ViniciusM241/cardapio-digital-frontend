import client from '~/boot/client';

export default async function (id) {
  const res = await client.delete(`/extras/${id}`);

  return res.data;
}
