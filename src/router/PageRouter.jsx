import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout"
import { paths } from "./paths";

export const PageRouter = () => {
  return (
    <>
        <Routes>
            <Route element={<MainLayout />}>
              {paths.map((item) => {
                return (
                  <Route key={item.id} path={item.path} element={<item.element />}/>
                )
              })}
            </Route>
        </Routes>
    </>
  )
}