import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/categories.slice";

import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log("selectCategoriesMap", selectCategoriesMap);

  return (
    <Fragment>
      {categoriesMap ? (
        <>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })}
        </>
      ) : (
        <h1>No Product loaded</h1>
      )}
    </Fragment>
  );
}

export default CategoriesPreview;
