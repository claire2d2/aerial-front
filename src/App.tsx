import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import PoleDance from "./pages/PoleDance";
import AerialHoop from "./pages/AerialHoop";
import Contorsion from "./pages/Contorsion";
import Figures from "./pages/Figures";
import OneFigure from "./pages/OneFigure";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

/* Rerouting if necessary */
import IsLoggedOut from "./components/Routing/IsLoggedOut";

function App() {
  return (
    <>
      <div className="App h-screen w-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/pole">
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
          </Route>

          <Route element={<IsLoggedOut />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
