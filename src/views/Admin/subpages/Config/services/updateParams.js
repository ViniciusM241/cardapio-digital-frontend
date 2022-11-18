import client from '~/boot/client';

export default async function(values) {
  const res = await client.patch('/params', values);

  if (res.status === 201) {
    return true;
  } else {
    return false;
  }
}
