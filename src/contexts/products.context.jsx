import { createContext, useState, useEffect } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductContext = createContext({
  currentProducts: [],
  //   setCurrentProducts: () => null,
});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  //   useEffect(() => {
  //     setCurrentProducts(PRODUCTS);
  //     //Fetch data from firebase firestore
  //     //data = date.json()
  //     //setCurrentProduct(data)
  //     console.log("useEffect in Products Context");
  //   }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
