import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainApp from "./pages/MainApp";
import Example from "./components/Example";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
