import { collection, doc, getDocs, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import db from "../db/db.js";

export const getProductsDB = async () => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((productDoc) => ({ ...productDoc.data(), id: productDoc.id }));
};

export const getProductByIdDB = async (productId) => {
  const productRef = doc(db, "products", productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    throw new Error("Producto no encontrado");
  }

  return { ...snapshot.data(), id: snapshot.id };
};

export const createOrderWithStockUpdate = async (order, cart) => {
  const newOrderId = await runTransaction(db, async (transaction) => {
    const ordersRef = collection(db, "orders");
    const orderRef = doc(ordersRef);

    // primero leemos y validamos el stock de TODOS los productos
    const productsToUpdate = [];

    for (const productCart of cart) {
      const productRef = doc(db, "products", productCart.id);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error(`El producto ${productCart.title} ya no existe`);
      }

      const currentStock = productDoc.data().stock;

      if (currentStock < productCart.quantity) {
        throw new Error(`No hay stock suficiente de ${productCart.title}`);
      }

      productsToUpdate.push({ ref: productRef, newStock: currentStock - productCart.quantity });
    }

    // recién ahora escribimos: descontamos stock y creamos la orden
    productsToUpdate.forEach((product) => {
      transaction.update(product.ref, { stock: product.newStock });
    });

    transaction.set(orderRef, { ...order, date: serverTimestamp() });

    return orderRef.id;
  });

  return newOrderId;
};