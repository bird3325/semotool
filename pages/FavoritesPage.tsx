
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Star, Menu } from 'lucide-react';
import { CALCULATOR_CATEGORIES, POPULAR_TOOLS } from '../constants';
import AdBanner from '../components/ui/AdBanner';

const allToolsWithDetails = CALCULATOR_CATEGORIES.flatMap(category =>
  category.tools.map(tool => {
    const popularTool = POPULAR_TOOLS.find(t => t.id === tool.id);
    let toolName = `${tool.name} 계산기`;
    if (popularTool) {
      toolName = popularTool.name;
    } else if (['length', 'weight', 'temperature', 'area', 'volume', 'time', 'gpa'].includes(tool.id)) {
      toolName = `${tool.name} 변환기`;
    }

    return {
      ...tool,
      name: toolName,
      categoryColor: category.color,
    };
  })
);


interface FavoritesPageProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openMenu: () => void;
  clearFavorites: () => void;
  addRecent: (id: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, toggleFavorite, openMenu, clearFavorites, addRecent }) => {
  const favoriteTools = allToolsWithDetails.filter(tool => favorites.includes(tool.id));

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 md:px-6 flex justify-between items-center border-b border-gray-200">
        <div className="w-20">
          <button onClick={openMenu} className="p-2 -ml-2" aria-label="Open menu">
              <Menu className="text-gray-600" />
          </button>
        </div>
        <h1 className="text-lg font-bold text-gray-800">즐겨찾기</h1>
        <div className="w-20 text-right">
           {favoriteTools.length > 0 && (
              <button
                onClick={clearFavorites}
                className="p-2 text-sm font-semibold text-red-500"
                aria-label="Clear all favorites"
              >
                전체삭제
              </button>
            )}
        </div>
      </header>

      <main className="p-4 md:p-6">
        {favoriteTools.length > 0 ? (
          <div className="space-y-3">
            {favoriteTools.map(tool => (
              <div key={tool.id} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Link to={`/calculator/${tool.id}`} onClick={() => addRecent(tool.id)} className="flex items-center space-x-3 flex-grow">
                   <div className={`p-2 rounded-md ${tool.categoryColor.replace('text-', 'bg-').replace('-500', '-100')}`}>
                      <tool.icon size={20} className={tool.categoryColor} />
                  </div>
                  <span className="font-semibold text-gray-800">{tool.name}</span>
                </Link>
                <button 
                  onClick={() => toggleFavorite(tool.id)} 
                  className="p-2 ml-2 text-red-500 hover:text-red-700 transform transition-transform hover:scale-110"
                  aria-label={`${tool.name} 즐겨찾기에서 삭제`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <Star size={48} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-800">즐겨찾는 계산기가 없습니다</h2>
            <p className="mt-2 text-gray-500">계산기 목록에서 ⭐︎을 눌러 추가해보세요.</p>
            <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              계산기 보러가기
            </Link>
          </div>
        )}
        <AdBanner />
      </main>
    </div>
  );
};

export default FavoritesPage;