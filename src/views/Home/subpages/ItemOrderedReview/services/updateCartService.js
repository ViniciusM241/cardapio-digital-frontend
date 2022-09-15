import client from "~/boot/client";

export default async function updateCartService(itemId, payload) {
  const res = await client.put(`/items-ordered/${itemId}`, payload);

  if (res.status === 204) {
    return true;
  } else {
    // error message
    return false;
  }
}
