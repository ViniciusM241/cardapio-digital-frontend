import client from '~/boot/client';

export default async function (values) {
  const res = await client.post(`/items`, values);

  return res;
}
