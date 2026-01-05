
import React, { useState, useEffect } from 'react';
import { Star, Search, Menu, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
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

const CategorySection: React.FC<{ 
    category: Category; 
    favorites: string[]; 
    toggleFavorite: (id: string) => void; 
    addRecent: (id: string) => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnd: (e: React.DragEvent) => void;
    index: number;
    isDragging: boolean;
    isAnyDragging: boolean;
}> = ({ category, favorites, toggleFavorite, addRecent, onDragStart, onDragOver, onDragEnd, index, isDragging, isAnyDragging }) => {
    const hasMore = category.tools.length > 6;
    const [isExpanded, setIsExpanded] = useState(false);

    const toolsToShow = isExpanded ? category.tools : category.tools.slice(0, 6);

    return (
        <div 
            id={category.id} 
            className={`transition-all duration-300 ease-in-out scroll-mt-20 
                ${isAnyDragging ? 'mb-2 px-6' : 'mb-8 px-4 md:px-6'} 
                ${isDragging ? 'opacity-30 scale-90' : 'opacity-100'}
                ${isAnyDragging && !isDragging ? 'scale-95' : 'scale-100'}`}
            onDragOver={(e) => onDragOver(e, index)}
        >
            <div className={`flex justify-between items-center rounded-2xl transition-all ${isAnyDragging ? 'bg-white border border-gray-200 p-4 shadow-sm' : 'mb-4 p-1'}`}>
                <div 
                    className="flex items-center cursor-grab active:cursor-grabbing group rounded-lg hover:bg-gray-50 transition-colors flex-grow"
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragEnd={onDragEnd}
                >
                    <GripVertical className={`w-5 h-5 mr-2 text-gray-300 group-hover:text-gray-400 transition-colors ${isAnyDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    <category.icon className={`w-6 h-6 mr-3 ${category.color}`} />
                    <h3 className={`font-bold text-gray-800 transition-all ${isAnyDragging ? 'text-base' : 'text-xl'}`}>{category.name}</h3>
                </div>
                {!isAnyDragging && hasMore && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center px-3 py-1 rounded-full hover:bg-blue-50 transition-colors">
                        <span>{isExpanded ? '간략히' : '더보기'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                    </button>
                )}
                {isAnyDragging && (
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{category.tools.length} Tools</div>
                )}
            </div>

            {/* 드래그 중일 때는 도구 목록을 숨겨서 박스를 작게 만듭니다 */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 transition-all duration-300 overflow-hidden ${isAnyDragging ? 'max-h-0 opacity-0 mt-0' : 'max-h-[2000px] opacity-100 mt-2'}`}>
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
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedOrder = localStorage.getItem('categoryOrder');
    if (savedOrder) {
      try {
        const orderIds = JSON.parse(savedOrder) as string[];
        return orderIds
          .map(id => CALCULATOR_CATEGORIES.find(c => c.id === id))
          .filter((c): c is Category => !!c);
      } catch (e) {
        return CALCULATOR_CATEGORIES;
      }
    }
    return CALCULATOR_CATEGORIES;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('categoryOrder', JSON.stringify(categories.map(c => c.id)));
  }, [categories]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // 투명한 고스트 이미지를 설정하여 브라우저 기본 드래그 UI 대신 우리가 만든 UI가 돋보이게 합니다.
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newCategories = [...categories];
    const draggedItem = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setCategories(newCategories);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="pb-10">
      <Header openMenu={openMenu} />
      <Banner />
      
      {/* 정렬 모드 시 안내 문구 */}
      <div className={`text-center transition-all duration-300 overflow-hidden ${draggedIndex !== null ? 'max-h-10 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
         <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">순서 변경 모드 활성화됨</span>
      </div>

      <div className="mt-4">
        {categories.map((category, index) => (
          <React.Fragment key={category.id}>
            <CategorySection
              category={category}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              addRecent={addRecent}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === index}
              isAnyDragging={draggedIndex !== null}
            />
            {!draggedIndex && category.id === 'unit-conversion' && <AdBanner />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
