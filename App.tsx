import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
// 각 페이지/컴포넌트 import
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import FavoritesPage from "./pages/FavoritesPage";
import RecentPage from "./pages/RecentPage";
import SearchPage from "./pages/SearchPage";
import SideMenu from "./components/SideMenu";

const Footer = () => (
  <footer className="bg-gray-100 border-t border-gray-200 py-6 px-4">
    <div className="text-center">
      <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SemoTools. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage", error);
      return [];
    }
  });
  const [recents, setRecents] = useState<string[]>(() => {
    try {
      const savedRecents = localStorage.getItem("recents");
      return savedRecents ? JSON.parse(savedRecents) : [];
    } catch (error) {
      console.error("Error reading recents from localStorage", error);
      return [];
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("recents", JSON.stringify(recents));
    } catch (error) {
      console.error("Error saving recents to localStorage", error);
    }
  }, [recents]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const clearFavorites = () => setFavorites([]);

  const addRecent = (id: string) => {
    setRecents((prev) =>
      [id, ...prev.filter((rId) => rId !== id)].slice(0, 10)
    );
  };

  const clearRecents = () => setRecents([]);

  return (
    <div className="flex flex-col max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-white min-h-screen font-sans">
      <div className="flex-grow">
        <HashRouter>
          <SideMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    openMenu={() => setIsMenuOpen(true)}
                    addRecent={addRecent}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    openMenu={() => setIsMenuOpen(true)}
                    clearFavorites={clearFavorites}
                    addRecent={addRecent}
                  />
                }
              />
              <Route
                path="/recent"
                element={
                  <RecentPage
                    recents={recents}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    clearRecents={clearRecents}
                    openMenu={() => setIsMenuOpen(true)}
                    addRecent={addRecent}
                  />
                }
              />
              <Route
                path="/calculator/:id"
                element={
                  <CalculatorPage
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    addRecent={addRecent}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <SearchPage
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    addRecent={addRecent}
                  />
                }
              />
            </Routes>
          </main>
        </HashRouter>
      </div>
      <Footer />
    </div>
  );
}
