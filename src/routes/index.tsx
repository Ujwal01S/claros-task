import RootLayout from "@/components/layout/layout";
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
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
