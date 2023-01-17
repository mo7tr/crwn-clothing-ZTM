import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

// import { setCategories } from "../../store/categories/categories.action";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";

import "./shop.styles.scss";

function Shop() {
  const dispatch = useDispatch();

  // redux

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoriesArray = await getCategoriesAndDocuments("categories");
  //     dispatch(setCategories(categoriesArray));
  //   };

  //   getCategoriesMap();
  // }, [dispatch]);

  //redux-thunk

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
