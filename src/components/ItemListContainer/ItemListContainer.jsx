import { getProductsDB } from '../../services/firestore.js';
import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList.jsx';
import Loading from '../Loading/Loading.jsx';
import { useParams } from 'react-router';
import { CATEGORY_PREFIXES } from '../../data/categories.js';


const ItemListContainer = ({ saludo }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se ejecuta una vez al montar el componente para pedir todos los productos
    if (category) {
      getProductsDB()
        .then((data) => {
          const prefixes = CATEGORY_PREFIXES[category] ?? [];
          const filteredProducts = data.filter((product) =>
            prefixes.some((prefix) => product.category.startsWith(prefix))
          );
          setProducts(filteredProducts);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    else {
      getProductsDB()
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [category]);


  return (
    <section className="catalog-section">
      <div className="hero-panel">
        <span className="hero-badge">Nueva temporada</span>
        <h1>{saludo}</h1>
        <p>
          Descubri una coleccion con piezas destacadas, colores suaves y una
          presentacion mas moderna para tu tienda.
        </p>
      </div>

      <div className="catalog-header">
        <div>
          <span className="catalog-eyebrow">Seleccion destacada</span>
          <h2>Productos recomendados</h2>
        </div>
        <span className="catalog-count">
          {/* En el contador mostramos loader chico hasta conocer la cantidad total */}
          {loading ? <Loading compact /> : `${products.length} productos`}
        </span>
      </div>

      {/* Mientras carga mostramos spinner y cuando termina renderizamos la grilla */}
      {!loading && products.length === 0 ? (
        <p className="empty-state">No se encontraron productos en esta categoría.</p>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
};

export default ItemListContainer;
