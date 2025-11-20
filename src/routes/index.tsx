import RootLayout from "@/components/layout/layout";
import NotFound from "@/components/not-found";
import { Spinner } from "@/components/ui/spinner";
import { ROUTE } from "@/constants/route.constant";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// lazy component imports
const HomePage = lazy(() => import("@/pages/home"));
const AllProductsPage = lazy(() => import("@/pages/home/all-products"));
const CategoryPage = lazy(() => import("@/pages/data/category"));
const UsersPage = lazy(() => import("@/pages/data/user"));
const CartPage = lazy(() => import("@/pages/cart/index"));

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path={ROUTE.HOME_ALL_PRODUCTS}
          element={
            <Suspense fallback={<Spinner />}>
              <AllProductsPage />
            </Suspense>
          }
        />

        {/* Data routes */}
        <Route
          path={ROUTE.DATA_CATEGORY}
          element={
            <Suspense fallback={<Spinner />}>
              <CategoryPage />
            </Suspense>
          }
        />

        <Route
          path={ROUTE.DATA_USER}
          element={
            <Suspense fallback={<Spinner />}>
              <UsersPage />
            </Suspense>
          }
        />

        {/* cart route */}
        <Route
          path={ROUTE.CART}
          element={
            <Suspense fallback={<Spinner />}>
              <CartPage />
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
