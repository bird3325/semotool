
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, ChevronLeft, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CALCULATOR_CATEGORIES, POPULAR_TOOLS } from '../constants';

const allToolsWithDetails = CALCULATOR_CATEGORIES.flatMap(category =>
  category.tools.map(tool => {
    const popularTool = POPULAR_TOOLS.find(t => t.id === tool.id);
    // Keep internal name logic for searching, view will use translation keys
    // We might need to consider searching against translated names or English names as well.
    // For now, let's keep the internal structure but display translated names in the result list.
    let toolName = `${tool.name} 계산기`;
    if (popularTool) {
      toolName = popularTool.name;
    } else if (['length', 'weight', 'temperature', 'area', 'volume', 'time', 'gpa'].includes(tool.id)) {
      toolName = `${tool.name} 변환기`;
    }
    return { ...tool, name: toolName, categoryColor: category.color };
  })
);

interface SearchPageProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addRecent: (id: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ favorites, toggleFavorite, addRecent }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredTools = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    // TODO: Improve search to handle searching by translated names if needed.
    // Ideally we should search against the translated name `t('tool.' + tool.id)`
    // But hooks cannot be used in callback like this directly or efficiently for all items without refactoring.
    // For this task, we will focus on translating the UI elements of the search page itself.
    return allToolsWithDetails.filter(tool =>
      tool.name.includes(query.trim()) ||
      tool.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <div>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 md:px-6 flex items-center border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft />
        </button>
        <div className="relative flex-grow mx-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-gray-100 border-transparent focus:ring-2 focus:ring-blue-500 focus:bg-white rounded-lg pl-10 pr-10 py-2.5 text-gray-800"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <X size={20} />
            </button>
          )}
        </div>
      </header>

      <main className="p-4 md:p-6">
        {query.trim() === '' ? (
          <div className="text-center py-20 px-4">
            <Search size={48} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-800">{t('search.empty_title')}</h2>
            <p className="mt-2 text-gray-500">{t('search.empty_desc')}</p>
          </div>
        ) : filteredTools.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">{t('search.result_count', { count: filteredTools.length })}</p>
            {filteredTools.map(tool => {
              const isFavorite = favorites.includes(tool.id);
              return (
                <div key={tool.id} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <Link to={`/calculator/${tool.id}`} onClick={() => addRecent(tool.id)} className="flex items-center space-x-3 flex-grow">
                    <div className={`p-2 rounded-md ${tool.categoryColor.replace('text-', 'bg-').replace('-500', '-100')}`}>
                      <tool.icon size={20} className={tool.categoryColor} />
                    </div>
                    {/* Use translated tool name in the search result as well */}
                    <span className="font-semibold text-gray-800">{t(`tool.${tool.id}`)}</span>
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
            <h2 className="mt-4 text-xl font-bold text-gray-800">{t('search.no_results_title')}</h2>
            <p className="mt-2 text-gray-500">{t('search.no_results_desc')}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
