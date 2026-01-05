
import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Home as HomeIcon, Star as StarIcon, Clock, X, ChevronDown } from 'lucide-react';
import { CALCULATOR_CATEGORIES } from '../constants';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, favorites, toggleFavorite }) => {
    const location = useLocation();
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    
    const navItems = [
        { path: '/', label: '홈', icon: HomeIcon },
        { path: '/favorites', label: '즐겨찾기', icon: StarIcon },
        { path: '/recent', label: '최근', icon: Clock },
    ];
    
    const handleCategoryClick = (categoryId: string) => {
        setOpenCategory(prev => prev === categoryId ? null : categoryId);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Side Menu */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="menu-title"
            >
                <div className="p-4 border-b flex justify-between items-center">
                     <div className="flex items-center space-x-2">
                        <div className="bg-orange-100 p-1.5 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="5" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="5" y="10" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="5" y="15" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="10" y="5" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="10" y="10" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="10" y="15" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="15" y="5" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="15" y="10" width="3" height="3" rx="1" fill="#F97316"/>
                                <rect x="15" y="15" width="3" height="3" rx="1" fill="#F97316"/>
                            </svg>
                        </div>
                        <h2 id="menu-title" className="text-lg font-bold text-gray-800">세모툴</h2>
                    </div>
                    <button onClick={onClose} className="p-2" aria-label="Close menu">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <nav className="h-[calc(100%-65px)] overflow-y-auto">
                    <ul className="mt-4">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        onClick={onClose}
                                        className={`flex items-center px-4 py-3 text-lg font-medium ${
                                            isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <item.icon className={`w-6 h-6 mr-4 ${isActive ? 'text-gray-900' : 'text-gray-500'} ${isActive && item.path !== '/' ? 'fill-current' : ''}`} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <hr className="my-2 mx-4" />
                    <p className="px-4 pt-2 pb-1 text-sm font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
                    <ul>
                        {CALCULATOR_CATEGORIES.map((category) => {
                             const isCategoryOpen = openCategory === category.id;
                             return (
                                <li key={category.id}>
                                    <button
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 text-left"
                                        aria-expanded={isCategoryOpen}
                                    >
                                        <div className="flex items-center">
                                            <category.icon className={`w-6 h-6 mr-4 ${category.color}`} />
                                            <span>{category.name}</span>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isCategoryOpen && (
                                        <ul className="pl-10 pr-2 pb-2 bg-gray-50/50">
                                            {category.tools.map(tool => {
                                                const isFavorite = favorites.includes(tool.id);
                                                return (
                                                    <li key={tool.id} className="py-1">
                                                        <div className="flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-200/60 rounded-md">
                                                            <Link
                                                                to={`/calculator/${tool.id}`}
                                                                onClick={onClose}
                                                                className="flex items-center flex-grow"
                                                            >
                                                                <tool.icon className="w-4 h-4 mr-3 text-gray-500" />
                                                                <span>{tool.name}</span>
                                                            </Link>
                                                            <button
                                                                onClick={() => toggleFavorite(tool.id)}
                                                                className="p-1 ml-2 flex-shrink-0"
                                                                aria-label={isFavorite ? `${tool.name} 즐겨찾기에서 삭제` : `${tool.name} 즐겨찾기에 추가`}
                                                            >
                                                                <StarIcon className={`w-4 h-4 transition-colors ${isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400 hover:text-gray-600'}`} />
                                                            </button>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default SideMenu;