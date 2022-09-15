import client from "~/boot/client";

export default async function getAddress(cep) {
  if (!cep || cep.length < 8) return {};

  const res = await client.get(`/address/${cep}`);

  return res.data;
}
