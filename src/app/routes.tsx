import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { GalleryPage } from "./pages/GalleryPage";
import { StaffDetailPage } from "./pages/StaffDetailPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "gallery/:category", Component: GalleryPage },
      { path: "staff/:id", Component: StaffDetailPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
