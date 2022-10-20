import client from "~/boot/client";

export default async function (filters) {
  const res = await client.get(`/customers/search${filters ? `?${filters}` : ''}`);

  return res.data;
}
