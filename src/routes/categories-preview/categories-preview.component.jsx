import { Fragment } from "react";
import { useSelector } from "react-redux";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {categoriesMap ? (
            <Fragment>
              {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                  <CategoryPreview
                    key={title}
                    title={title}
                    products={products}
                  />
                );
              })}
            </Fragment>
          ) : (
            <h1>No Product loaded</h1>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default CategoriesPreview;
