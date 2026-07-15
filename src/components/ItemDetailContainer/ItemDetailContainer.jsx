import { useState, useEffect } from 'react';
import { getProductByIdDB } from '../../services/firestore.js';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import Loading from '../Loading/Loading.jsx';
import { useParams } from 'react-router';

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getProductByIdDB(productId)
      .then((data) => setProduct(data))
      .catch((fetchError) => {
        setProduct(null);
        setError(fetchError.message);
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (error) return <h2 className="error-state">{error}</h2>;
  if (isLoading) return <Loading />;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;