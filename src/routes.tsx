import React from "react";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RequiredAuth from "./components/RequiredAuth";
import RequiredNoAuth from "./components/RequiredNoAuth";
import { useEffect } from "react";
import { authenticationService } from "./services/authentication.service";
import { UpdateSupplierBank } from "./pages/UpdateSupplierBank";
import { Orders } from "./pages/Orders";
import { OrderDetail } from "./pages/Orders/OrderDetail";

const AppRoutes = ({ setShowAttachmentForm }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const subscription = authenticationService.token.subscribe((token: any) => {
      if (!token) {
        navigate("/login");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RequiredNoAuth>
            <Login />
          </RequiredNoAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Home />
          </RequiredAuth>
        }
      >
        <Route path="update-supplier-bank" element={<UpdateSupplierBank />} />
        <Route path="orders" element={<Orders />} />
        <Route
          path="orders/:orderid"
          element={<OrderDetail onAddClick={setShowAttachmentForm} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
