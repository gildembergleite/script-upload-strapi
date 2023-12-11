import { log } from "./log.js";

export async function createNewEntry(item, order) {
  try {
    const formData = {
      data: {
        Ordem: Number(order),
        Titulo: item.api_name,
        download_categoria: { id: 2 },
      },
    };

    const response = await fetch(process.env.DOWNLOAD_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const RESPONSE_DATA = await response.json();
    log(`Item ${item.api_name} created`);

    return RESPONSE_DATA;
  } catch (error) {
    log(`Item ${item.api_name} not created, see error below\n${error}`);
    return null;
  }
}
