import { Fragment } from "react";
import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectCategoriesError,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner></Spinner>
      ) : Object.keys(categoriesMap).length > 0 ? (
        <>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })}
        </>
      ) : (
        <h1>{error}</h1>
      )}

      {Object.keys(categoriesMap).length > 0 ? (
        <>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })}
        </>
      ) : (
        <h1>{error}</h1>
      )}
    </Fragment>
  );
}

export default CategoriesPreview;
