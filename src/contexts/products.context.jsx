import { createContext, useState, useEffect } from "react";

import SHOP_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  currentProducts: null,
  setCurrentProducts: () => null,
});

export function ProductsProvider({ children }) {
  const [currentProducts, setCurrentProducts] = useState(null);
  const value = { currentProducts, setCurrentProducts };

  useEffect(() => {
    setCurrentProducts(SHOP_DATA);
    //Fetch data from firebase firestore
    //data = date.json()
    //setCurrentProduct(data)
    console.log("useEffect in Products Context");
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
