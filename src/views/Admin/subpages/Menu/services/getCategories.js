import client from '~/boot/client';

export default async function () {
  const res = await client.get(`/categories`);

  return res.data;
}
