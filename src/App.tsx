import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <div className="App h-screen w-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
