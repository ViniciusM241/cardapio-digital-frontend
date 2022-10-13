import client from '~/boot/client';

export default async function (data) {
  const res = await client.post(`/categories`, data);

  return res;
}
