/** App — Root component: multi-view flow (Login → Lens Transition → Planet Hub → Pages). */
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./components/pages/LoginPage";
import PlanetHub from "./components/pages/PlanetHub";
import AboutPage from "./components/pages/AboutPage";

import CreatorsPage from "./components/pages/CreatorsPage";
import SearchPage from "./components/pages/SearchPage";
import LensTransition from "./components/ui/LensTransition";

/**
 * View states:
 * - login       : Login page (telescope + person watching)
 * - lens        : Eyepiece → objective lens cinematic transition
 * - hub         : Rotating planet navigation hub
 * - about       : About section
 * - studies     : Studies section
 * - news        : Recent news section
 * - creators    : Team / creators section
 * - search      : Search portal (11 inputs → results)
 */

export default function App() {
  const [view, setView] = useState("login");
  const [userName, setUserName] = useState("");

  /* Login complete → start lens transition */
  const handleLogin = useCallback((name) => {
    setUserName(name);
    setView("lens");
  }, []);

  /* Lens transition complete → show hub */
  const handleLensComplete = useCallback(() => {
    setView("hub");
  }, []);

  /* Navigate from hub to a page */
  const handleNavigate = useCallback((destination) => {
    setView(destination);
  }, []);

  /* Return to hub */
  const handleBackToHub = useCallback(() => {
    setView("hub");
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {view === "login" && (
          <LoginPage key="login" onLogin={handleLogin} />
        )}
      </AnimatePresence>

      {/* Lens transition overlay */}
      <LensTransition
        isActive={view === "lens"}
        onComplete={handleLensComplete}
      />

      {view === "hub" && (
        <PlanetHub
          key="hub"
          userName={userName}
          onNavigate={handleNavigate}
        />
      )}

      {view === "about" && (
        <AboutPage key="about" onBack={handleBackToHub} />
      )}



      {view === "creators" && (
        <CreatorsPage key="creators" onBack={handleBackToHub} />
      )}

      {view === "search" && (
        <SearchPage key="search" onBack={handleBackToHub} />
      )}
    </div>
  );
}
