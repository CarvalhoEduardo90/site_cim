
import React from 'react';
import { SemadecEvent } from '../types';

/**
 * DADOS DOS EVENTOS - Edite aqui para adicionar ou remover eventos da SEMADEC
 */
const EVENTS: SemadecEvent[] = [
  {
    id: 1,
    title: 'Conferência Missionária 2024',
    date: '25 de Outubro, 2024',
    location: 'Vitória, ES',
    description: 'Um encontro para despertar o coração missionário da igreja local com preletores de todo o mundo. Inscrições abertas via formulário oficial.',
    imageUrl: 'https://picsum.photos/seed/event1/800/400',
    link: 'https://forms.gle/exemploEvento1' // Link do Google Forms
  },
  {
    id: 2,
    title: 'Workshop de Evangelismo Criativo',
    date: '12 de Setembro, 2024',
    location: 'Vila Velha, ES',
    description: 'Ferramentas práticas para alcançar a nova geração através da arte e comunicação. Vagas limitadas.',
    imageUrl: 'https://picsum.photos/seed/event2/800/400',
    link: 'https://forms.gle/exemploEvento2'
  },
  {
    id: 3,
    title: 'Encontro de Líderes Semadec',
    date: '05 de Novembro, 2024',
    location: 'Serra, ES',
    description: 'Alinhamento estratégico para coordenadores de edições CIM. Exclusivo para membros da equipe.',
    imageUrl: 'https://picsum.photos/seed/event3/800/400',
    link: 'https://forms.gle/exemploEvento3'
  }
];

const Events: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4">Eventos Semadec</h1>
        <p className="text-slate-500 max-w-2xl">Fique por dentro das conferências, treinamentos e encontros organizados pela Semadec além da escola de missões.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img src={event.imageUrl} className="w-full h-full object-cover" alt={event.title} />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold text-primary">
                Inscrições Abertas
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                {event.date}
              </div>
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-3">{event.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {event.location}
              </div>
              <button 
                onClick={() => window.open(event.link, '_blank')}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Inscrição Online <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
