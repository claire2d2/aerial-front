import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="App h-screen w-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
