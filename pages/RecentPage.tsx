
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Menu } from 'lucide-react';
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

const allToolsMap = new Map(allToolsWithDetails.map(tool => [tool.id, tool]));

interface RecentPageProps {
  recents: string[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  clearRecents: () => void;
  openMenu: () => void;
  addRecent: (id: string) => void;
}

const RecentPage: React.FC<RecentPageProps> = ({ recents, favorites, toggleFavorite, clearRecents, openMenu, addRecent }) => {
  const recentTools = recents.map(id => allToolsMap.get(id)).filter(Boolean);

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 md:px-6 flex justify-between items-center border-b border-gray-200">
        <div className="w-20">
            <button onClick={openMenu} className="p-2 -ml-2" aria-label="Open menu">
                <Menu className="text-gray-600" />
            </button>
        </div>
        <h1 className="text-lg font-bold text-gray-800">최근 본 페이지</h1>
        <div className="w-20 text-right">
            <button
            onClick={clearRecents}
            className="p-2 text-sm font-semibold text-red-500 disabled:text-gray-400"
            disabled={recentTools.length === 0}
            >
            {recentTools.length > 0 && '전체삭제'}
            </button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        {recentTools.length > 0 ? (
          <div className="space-y-3">
            {recentTools.map(tool => {
                if (!tool) return null;
                const isFavorite = favorites.includes(tool.id);
                return (
                    <div key={tool.id} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <Link to={`/calculator/${tool.id}`} onClick={() => addRecent(tool.id)} className="flex items-center space-x-3 flex-grow">
                        <div className={`p-2 rounded-md ${tool.categoryColor.replace('text-', 'bg-').replace('-500', '-100')}`}>
                            <tool.icon size={20} className={tool.categoryColor} />
                        </div>
                        <span className="font-semibold text-gray-800">{tool.name}</span>
                        </Link>
                        <button onClick={() => toggleFavorite(tool.id)} className="p-2 ml-2">
                            <Star size={20} className={isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                        </button>
                    </div>
                );
            })}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <Clock size={48} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-800">최근 본 계산기가 없습니다</h2>
            <p className="mt-2 text-gray-500">계산기를 사용하면 여기에 목록이 표시됩니다.</p>
            <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              계산기 보러가기
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecentPage;
