export const MOCK = {
  status: "success",
  payload: [
    {
      id: 6,
      api_id: "abitare-hd-mock",
      api_name: "ABITARE HD MOCK",
      file: "collection/file/abitare-hd-7.jpg",
      order: "99",
      lang: "pt",
      deleted_at: null,
      updated_at: "2022-09-22 17:58:21.567",
      related1: "alameda",
      related2: "arbo-hd",
      home: "0",
      catalog: "collection/catalog/abitare-7.pdf",
      created_at: "2019-01-18 13:00:00.000",
      link: "https://www.ceramicaportinari.com.br/pt/downloads/download_collection/0", // success: 6| fail: 0
      img: "/storage/collection/file/abitare-hd-8.jpg", // // success: -7| fail: -8
    },
    {
      id: 6,
      api_id: "abitare-hd-mock-2",
      api_name: "ABITARE HD MOCK 2",
      file: "collection/file/abitare-hd-7.jpg",
      order: "99",
      lang: "pt",
      deleted_at: null,
      updated_at: "2022-09-22 17:58:21.567",
      related1: "alameda",
      related2: "arbo-hd",
      home: "0",
      catalog: "collection/catalog/abitare-7.pdf",
      created_at: "2019-01-18 13:00:00.000",
      link: "https://www.ceramicaportinari.com.br/pt/downloads/download_collection/6", // success: 6| fail: 0
      img: "/storage/collection/file/abitare-hd-7.jpg", // // success: -7| fail: -8
    },
  ],
};

// https://www.ceramicaportinari.com.br + payload.item.img
// https://www.ceramicaportinari.com.br/storage/collection/file/abitare-hd-8.jpg