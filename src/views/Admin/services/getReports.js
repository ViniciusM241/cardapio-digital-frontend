import client from "~/boot/client";

export default async function (filters) {
  const res = await client.get(`/reports${filters ? `?${filters}` : ''}`);

  return res.data;
}
