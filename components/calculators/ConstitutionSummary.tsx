
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Gavel, BookOpen, ChevronRight, Scale } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Article {
  number: string;
  title: string;
  content: string;
}


const ConstitutionSummary: React.FC = () => {
  const { t } = useTranslation();

  const articles: Article[] = useMemo(() => [
    { number: t('ref.constitution.article.1_1.number'), title: t('ref.constitution.article.1_1.title'), content: t('ref.constitution.article.1_1.content') },
    { number: t('ref.constitution.article.1_2.number'), title: t('ref.constitution.article.1_2.title'), content: t('ref.constitution.article.1_2.content') },
    { number: t('ref.constitution.article.3.number'), title: t('ref.constitution.article.3.title'), content: t('ref.constitution.article.3.content') },
    { number: t('ref.constitution.article.10.number'), title: t('ref.constitution.article.10.title'), content: t('ref.constitution.article.10.content') },
    { number: t('ref.constitution.article.11_1.number'), title: t('ref.constitution.article.11_1.title'), content: t('ref.constitution.article.11_1.content') },
    { number: t('ref.constitution.article.21_1.number'), title: t('ref.constitution.article.21_1.title'), content: t('ref.constitution.article.21_1.content') },
    { number: t('ref.constitution.article.24.number'), title: t('ref.constitution.article.24.title'), content: t('ref.constitution.article.24.content') },
    { number: t('ref.constitution.article.31_1.number'), title: t('ref.constitution.article.31_1.title'), content: t('ref.constitution.article.31_1.content') },
    { number: t('ref.constitution.article.34_1.number'), title: t('ref.constitution.article.34_1.title'), content: t('ref.constitution.article.34_1.content') },
    { number: t('ref.constitution.article.37_2.number'), title: t('ref.constitution.article.37_2.title'), content: t('ref.constitution.article.37_2.content') },
  ], [t]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Gavel size={28} />
          <h2 className="text-2xl font-bold">{t('ref.constitution.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.constitution.desc')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((art, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-300 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
                  <Scale size={16} />
                </div>
                <span className="text-xs font-black text-rose-500 uppercase tracking-tighter">{art.number}</span>
              </div>
              <h4 className="font-black text-gray-900 text-lg">{art.title}</h4>
            </div>

            <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100 relative overflow-hidden">
              <p className="text-sm font-bold text-gray-700 leading-relaxed z-10 relative">
                "{art.content}"
              </p>
              <div className="absolute -right-4 -bottom-4 opacity-5 text-rose-900 transform rotate-12">
                <Gavel size={80} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdBanner />

      <div className="p-5 bg-gray-900 rounded-3xl">
        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed">
          ※ 위 내용은 헌법 전문 중 일반 국민이 꼭 알아야 할 핵심 내용을 선별한 것입니다. <br />
          전체 조문은 국가법령정보센터에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ConstitutionSummary;
