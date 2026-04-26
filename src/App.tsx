import { lazy, Suspense, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  // Sync core layout shifts strictly anchoring Lenis interceptor hook
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              }
            />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
