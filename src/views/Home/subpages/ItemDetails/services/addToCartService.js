import client from "~/boot/client";

export default async function addToCartService(payload) {
  const res = await client.post('/items-ordered', payload);

  if (res.status === 201) {
    return true;
  } else {
    // error message
    return false;
  }
}
