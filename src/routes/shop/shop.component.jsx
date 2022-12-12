import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

// import SHOP_DATA from "../../shop-data.json";

function Shop() {
  const { currentProducts } = useContext(ProductsContext);
  console.log("currentProducts in shop component =>", currentProducts);

  return (
    <div>
      {currentProducts ? (
        <div>
          {currentProducts.map(({ id, name }) => {
            return (
              <div key={id}>
                <h1>{name}</h1>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No Product loaded</h1>
      )}
    </div>
  );
}

export default Shop;
