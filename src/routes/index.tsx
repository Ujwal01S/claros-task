import RootLayout from "@/components/layout/layout";
import NotFound from "@/components/not-found";
import { ROUTE } from "@/constants/route.constant";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// lazy component imports
const HomePage = lazy(() => import("@/pages/home"));
const AllProductsPage = lazy(() => import("@/pages/home/all-products"));
const CategoryPage = lazy(() => import("@/pages/data/category"));

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path={ROUTE.HOME_ALL_PRODUCTS}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <AllProductsPage />
            </Suspense>
          }
        />

        {/* Data routes */}
        <Route
          path={ROUTE.DATA_CATEGORY}
          element={
            <Suspense>
              <CategoryPage />
            </Suspense>
          }
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
