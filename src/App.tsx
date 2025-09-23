import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainApp from "./pages/MainApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
