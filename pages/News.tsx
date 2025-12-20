
import React, { useState } from 'react';
import { NewsCard } from '../types';

const News: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsCard | null>(null);

  const news: NewsCard[] = [
    { 
      id: 1, 
      title: 'Inscrições abertas para a CIM Janeiro 2024', 
      category: 'Destaque', 
      date: '10 Jan, 2024', 
      description: 'Prepare seu coração para a maior experiência missionária intensiva do Brasil...', 
      imageUrl: 'https://picsum.photos/seed/news1/600/400',
      fullContent: 'As inscrições para a edição de Janeiro de 2024 já estão disponíveis. Este ano teremos foco em plantação de igrejas e evangelismo urbano. Os alunos terão aulas com preletores renomados e práticas em comunidades locais de Recife e Garanhuns. Não perca a oportunidade de despertar seu chamado.'
    },
    { 
      id: 2, 
      title: 'Como foi a edição de Julho: Resumo fotográfico', 
      category: 'Eventos', 
      date: '15 Jul, 2023', 
      description: 'Confira os melhores momentos da última edição que aconteceu em Caruaru...', 
      imageUrl: 'https://picsum.photos/seed/news2/600/400',
      fullContent: 'A edição de Julho de 2023 foi marcada por um forte mover de Deus entre os jovens. Mais de 200 alunos foram capacitados e enviados para 15 cidades do interior de Pernambuco. Tivemos testemunhos impactantes de curas e conversões durante os impactos evangelísticos.'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Notícias CIM SEMADEC</h1>
        <p className="text-slate-500">Acompanhe as últimas atualizações e novidades da nossa escola.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-8">
           {news.map((item) => (
             <article key={item.id} className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
               <div className="md:w-2/5 aspect-video md:aspect-auto">
                 <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="flex flex-col p-6 md:w-3/5">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-bold text-primary uppercase">{item.category}</span>
                   <span className="text-slate-300">•</span>
                   <span className="text-xs text-slate-400">{item.date}</span>
                 </div>
                 <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                 <p className="text-slate-500 text-sm line-clamp-3 mb-6">{item.description}</p>
                 <button 
                  onClick={() => setSelectedNews(item)}
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:underline w-fit"
                 >
                   Ler notícia completa <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </button>
               </div>
             </article>
           ))}
        </div>

        <aside className="flex flex-col gap-8">
           <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold mb-6 text-slate-900 dark:text-white">Próximas Datas</h3>
              <div className="flex flex-col gap-4">
                 {[
                   { date: '15 Jan', name: 'CIM Teens' },
                   { date: '08 Jul', name: 'CIM Adultos' },
                 ].map((d, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="size-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex flex-col items-center justify-center">
                         <span className="text-[10px] font-bold text-primary uppercase">{d.date.split(' ')[1]}</span>
                         <span className="text-lg font-black">{d.date.split(' ')[0]}</span>
                      </div>
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{d.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>

      {selectedNews && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="h-64 relative overflow-hidden">
               <img src={selectedNews.imageUrl} className="w-full h-full object-cover" alt="" />
               <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 size-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
               >
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="p-8">
               <div className="flex items-center gap-2 mb-4 text-xs font-bold text-primary uppercase">
                  {selectedNews.category} • {selectedNews.date}
               </div>
               <h2 className="text-3xl font-black mb-6 text-slate-900 dark:text-white leading-tight">{selectedNews.title}</h2>
               <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-4">
                  <p>{selectedNews.fullContent || selectedNews.description}</p>
               </div>
               <button 
                onClick={() => setSelectedNews(null)}
                className="mt-10 w-full py-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
               >
                 Fechar Notícia
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
