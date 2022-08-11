import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Login, ProductDetail, Purchases } from "./pages";
import { NavBar, LoadingScreen } from "./components";
import { useSelector } from "react-redux";
import "./App.css";
import { Container } from "react-bootstrap";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/purchases" element={<Purchases />} />
          </Route>          
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
