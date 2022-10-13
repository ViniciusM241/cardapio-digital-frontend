import client from '~/boot/client';

export default async function (id, data) {
  const res = await client.put(`/categories/${id}`, data);

  return res;
}
