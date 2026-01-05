
import React, { useState } from 'react';
import { Star, Search, Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CALCULATOR_CATEGORIES, POPULAR_TOOLS } from '../constants';
import { Category } from '../types';
import AdBanner from '../components/ui/AdBanner';

// FIX: Correctly map tools to include their category information by processing inside flatMap.
const allToolsMap = new Map(
  CALCULATOR_CATEGORIES.flatMap(category =>
    category.tools.map(tool => [tool.id, { ...tool, category }])
  )
);


interface HomePageProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openMenu: () => void;
  addRecent: (id: string) => void;
}

const Header: React.FC<{ openMenu: () => void }> = ({ openMenu }) => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 md:px-6 flex justify-between items-center border-b border-gray-200">
    <div className="w-10">
        <button onClick={openMenu} className="p-2 -ml-2" aria-label="Open menu">
            <Menu className="text-gray-600" />
        </button>
    </div>
    <h1 className="text-xl font-bold text-gray-800">세모툴</h1>
    <div className="w-10 flex justify-end">
        <Link to="/search" className="p-2 -mr-2" aria-label="Search">
            <Search className="text-gray-500" />
        </Link>
    </div>
  </header>
);

const Banner = () => (
    <div className="m-4 md:m-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-lg">
        <h2 className="text-2xl font-bold">세모툴</h2>
        <p className="mt-1 opacity-90">세상의 모든 툴로 해결하세요</p>
    </div>
);

const CategorySection: React.FC<{ category: Category; favorites: string[]; toggleFavorite: (id: string) => void; addRecent: (id: string) => void; }> = ({ category, favorites, toggleFavorite, addRecent }) => {
    const hasMore = category.tools.length > 6;
    const [isExpanded, setIsExpanded] = useState(false);

    const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 6);

    return (
        <div id={category.id} className="mb-8 px-4 md:px-6 scroll-mt-20">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <category.icon className={`w-6 h-6 mr-3 ${category.color}`} />
                    <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                </div>
                {hasMore && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center px-3 py-1 rounded-full hover:bg-blue-50 transition-colors">
                        <span>{isExpanded ? '간략히' : '더보기'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {toolsToShow.map(tool => {
                    const isFavorite = favorites.includes(tool.id);
                    return (
                        <div key={tool.id} className="relative group">
                            <Link to={`/calculator/${tool.id}`} onClick={() => addRecent(tool.id)} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-200 text-center h-full">
                                <div className={`mb-2 p-2 rounded-full ${category.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                                    <tool.icon className={`w-6 h-6 ${category.color}`} />
                                </div>
                                <span className="font-semibold text-sm text-gray-700">{tool.name}</span>
                            </Link>
                            <button
                                onClick={() => toggleFavorite(tool.id)}
                                className="absolute top-2 right-2 p-1 bg-white/50 rounded-full text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity"
                                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-400 fill-current' : ''}`} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ favorites, toggleFavorite, openMenu, addRecent }) => {
  return (
    <div>
      <Header openMenu={openMenu} />
      <Banner />
      <div className="mt-8">
        {CALCULATOR_CATEGORIES.map(category => (
          <React.Fragment key={category.id}>
            <CategorySection
              category={category}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addRecent={addRecent}
            />
            {category.id === 'unit-conversion' && <AdBanner />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
