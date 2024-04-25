import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

// homepages
import HomePage from "./pages/HomePage";
import PoleDance from "./pages/PoleDance";
import AerialHoop from "./pages/AerialHoop";
import Contorsion from "./pages/Contorsion";

// pages for disciplines
import Figures from "./pages/Figures";
import OneFigure from "./pages/OneFigure";
import GenerateCombo from "./pages/GenerateCombo";
import AllCombos from "./pages/AllCombos";

// pages for user
import UserSettings from "./pages/UserSettings";
import AdminDashboard from "./pages/AdminDashboard";

// website information
import About from "./pages/About";
import SiteMap from "./pages/SiteMap";
import Contact from "./pages/Contact";

// pages not found
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
              // TODO add admin path
            </Route>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="site" element={<SiteMap />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="admin" element={<AdminDashboard />} />

            <Route path="pole">
              <Route index element={<PoleDance />} />
              <Route path="combo-generator" element={<GenerateCombo />} />
              <Route path="combos" element={<AllCombos />} />
              <Route path="figures">
                <Route index element={<Figures />} />
                <Route path=":figureRef" element={<OneFigure />} />
              </Route>
            </Route>
            <Route path="/aerial-hoop">
              <Route index element={<AerialHoop />} />
              <Route path="combo-generator" element={<GenerateCombo />} />
              <Route path="combos" element={<AllCombos />} />
              <Route path="figures">
                <Route index element={<Figures />} />
                <Route path=":figureRef" element={<OneFigure />} />
              </Route>
            </Route>
            <Route path="/contorsion">
              <Route index element={<Contorsion />} />
              <Route path="combo-generator" element={<GenerateCombo />} />
              <Route path="combos" element={<AllCombos />} />
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
