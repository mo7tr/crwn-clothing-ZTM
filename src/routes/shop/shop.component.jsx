import { useContext } from "react";
import { ProductContext } from "../../contexts/products.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

function Shop() {
  const { products } = useContext(ProductContext);
  console.log("currentProducts in shop component =>", products);

  return (
    <div>
      {products ? (
        <div className="products-container">
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <h1>No Product loaded</h1>
      )}
    </div>
  );
}

export default Shop;
