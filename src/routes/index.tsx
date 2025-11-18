import RootLayout from "@/components/layout/layout";
import NotFound from "@/components/not-found";
import CategoryPage from "@/pages/data/category";
import HomePage from "@/pages/home";
import { Route, Routes } from "react-router";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="/product"
          element={<CategoryPage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
