import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import PoleDance from "./pages/PoleDance";
import AerialHoop from "./pages/AerialHoop";
import Contorsion from "./pages/Contorsion";
import Figures from "./pages/Figures";
import OneFigure from "./pages/OneFigure";
import UserSettings from "./pages/UserSettings";

import NotFound from "./pages/NotFound";

/* Rerouting if necessary */
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <>
      <div className="App h-screen w-screen overscroll-auto no-scrollbar">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<IsLoggedOut />}>
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
            </Route>
            <Route index element={<HomePage />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="pole">
              <Route index element={<PoleDance />} />
              <Route path="figures">
                <Route index element={<Figures />} />
                <Route path=":figureRef" element={<OneFigure />} />
              </Route>
            </Route>
            <Route path="/aerial-hoop">
              <Route index element={<AerialHoop />} />
              <Route path="figures">
                <Route index element={<Figures />} />
                <Route path=":figureRef" element={<OneFigure />} />
              </Route>
            </Route>
            <Route path="/contorsion">
              <Route index element={<Contorsion />} />
              <Route path="figures">
                <Route index element={<Figures />} />
                <Route path=":figureRef" element={<OneFigure />} />
              </Route>
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
