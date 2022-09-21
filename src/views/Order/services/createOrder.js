import client from "~/boot/client";

export default async function createOrder(values) {
  if (!values) return false;

  const res = await client.post(`/orders/`, values);

  return res.data;
}
