import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

/* Rerouting if necessary */
import IsLoggedOut from "./components/Layout/Routing/IsLoggedOut";

function App() {
  return (
    <>
      <div className="App h-screen w-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route element={<IsLoggedOut />}>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LogInPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
