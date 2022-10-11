import client from "~/boot/client";

export default async function getItemOrdered(id) {
  const res = await client.get(`/items-ordered/${id}`);

  return res.data;
}
