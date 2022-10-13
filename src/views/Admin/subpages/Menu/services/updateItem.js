import client from '~/boot/client';

export default async function (id, values) {
  const res = await client.put(`/items/${id}`, values);

  return res;
}
