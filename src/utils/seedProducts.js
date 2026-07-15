import { collection, writeBatch, doc } from "firebase/firestore";
import db from "../db/db.js";
import products from "../data/hering_products.json";

const parsePrice = (priceString) => {
  // "$ 549" -> 549
  return Number(priceString.replace(/[^\d]/g, ""));
};

const seedProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const chunkSize = 450; // limite de Firestore es 500 operaciones por batch

    // Algunos productos no trajen precio (price: null) -> no se pueden vender, los excluimos
    const validProducts = products.filter((product) => product.price !== null);
    console.log(`Se excluyen ${products.length - validProducts.length} productos sin precio`);

    for (let i = 0; i < validProducts.length; i += chunkSize) {
      const batch = writeBatch(db);
      const chunk = validProducts.slice(i, i + chunkSize);

      chunk.forEach((product) => {
        const productRef = doc(productsRef, String(product.id));
        batch.set(productRef, {
          ...product,
          price: parsePrice(product.price),
        });
      });

      await batch.commit();
      console.log(`Batch ${i / chunkSize + 1} subido (${chunk.length} productos)`);
    }

    console.log("Todos los productos se subieron correctamente");
  } catch (error) {
    console.error(error);
  }
};

seedProducts();