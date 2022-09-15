import client from "~/boot/client";

export async function changeItemQuantity(customerId, itemId, quantity) {
  const res = await client.patch(`/carts/${customerId}/items-ordered/${itemId}`, {
    quantity,
  });

  if (res.status === 200) {
    return res.data;
  } else {
    // error message
    return false;
  }
}

export async function excludeItem(customerId, itemId) {
  const res = await client.delete(`/carts/${customerId}/items-ordered/${itemId}`);

  if (res.status === 200) {
    return res.data;
  } else {
    // error message
    return false;
  }
}
