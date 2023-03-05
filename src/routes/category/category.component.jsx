import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  selectCategoriesMap,
  selectCategoriesError,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>

      {isLoading ? (
        <Spinner />
      ) : Object.keys(categoriesMap).length > 0 ? (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
              />
            ))}
        </div>
      ) : (
        <h1>{error}</h1>
      )}
    </Fragment>
  );
}

export default Category;
