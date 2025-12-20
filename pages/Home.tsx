
import React, { useState } from 'react';
import { Page, ProgramDetails } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

/**
 * DADOS DOS PROGRAMAS - Edite aqui para alterar as informações da tela inicial
 */
const PROGRAMS: ProgramDetails[] = [
  {
    title: 'CIM Kids',
    age: '5 a 11 anos',
    theme: 'Exploradores do Reino',
    vision: 'Despertar a consciência missionária desde a infância, mostrando que a criança também faz parte do plano de Deus para as nações.',
    objective: 'Ensinar princípios bíblicos básicos de missões através de atividades lúdicas, artes e histórias reais de missionários.',
    imageUrl: 'https://picsum.photos/seed/cimkids/600/400'
  },
  {
    title: 'CIM Teens',
    age: '12 a 17 anos',
    theme: 'Raízes Profundas',
    vision: 'Consolidar a identidade cristã no adolescente e prepará-lo para ser um influenciador do Reino em seu ambiente escolar e social.',
    objective: 'Capacitar o adolescente em evangelismo prático e discipulado, além de introduzir conceitos teológicos fundamentais.',
    imageUrl: 'https://picsum.photos/seed/cimteens/600/400'
  },
  {
    title: 'CIM Adultos',
    age: '18+ anos',
    theme: 'Ide e Pregai',
    vision: 'Equipar vocacionados com ferramentas teológicas e práticas para o serviço transcultural e plantação de igrejas.',
    objective: 'Proporcionar uma imersão intensiva em teologia de missões, antropologia bíblica e práticas de campo em comunidades carentes.',
    imageUrl: 'https://picsum.photos/seed/cimadults/600/400'
  }
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);

  const openVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-10 lg:py-20 px-4">
        <div className="w-full max-w-[1280px] rounded-2xl overflow-hidden shadow-2xl relative min-h-[600px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("https://picsum.photos/seed/cimhero/1280/800")' }}>
          <div className="relative z-10 flex flex-col gap-6 text-center max-w-3xl px-6">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Escola de Missões: Transformando Vidas
            </h1>
            <p className="text-slate-200 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Participe da maior experiência missionária nas suas férias. Edições em Janeiro e Julho para despertar sua vocação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <button onClick={() => onNavigate(Page.Enrollment)} className="h-12 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
                <span>Garanta sua Vaga</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button onClick={openVideo} className="h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-base font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">play_circle</span>
                <span>Assista o Vídeo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="w-full bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-black text-white">+120</span>
            <span className="text-sm text-blue-100 font-medium">Edições Realizadas</span>
          </div>
          <div className="flex flex-col gap-1 pl-4">
            <span className="text-3xl font-black text-white">5k+</span>
            <span className="text-sm text-blue-100 font-medium">Alunos Formados</span>
          </div>
          <div className="flex flex-col gap-1 pl-4">
            <span className="text-3xl font-black text-white">40</span>
            <span className="text-sm text-blue-100 font-medium">Cidades Alcançadas</span>
          </div>
          <div className="flex flex-col gap-1 pl-4">
            <span className="text-3xl font-black text-white">2</span>
            <span className="text-sm text-blue-100 font-medium">Edições por Ano</span>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-primary font-bold tracking-wide uppercase text-sm">Programas Exclusivos</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white max-w-2xl">
            Edições para Todas as Idades
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => (
            <div key={program.title} className="group flex flex-col gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{program.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">{program.age}</span>
                </div>
                <p className="text-sm font-semibold text-primary">Tema: {program.theme}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">Clique em ver detalhes para conhecer a visão e o objetivo deste programa.</p>
                <button 
                  onClick={() => setSelectedProgram(program)}
                  className="mt-4 w-full h-10 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="h-48 relative overflow-hidden">
               <img src={selectedProgram.imageUrl} className="w-full h-full object-cover" alt="" />
               <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 size-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
               >
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="p-8">
               <h2 className="text-3xl font-black mb-1 text-slate-900 dark:text-white">{selectedProgram.title}</h2>
               <p className="text-primary font-bold mb-6">{selectedProgram.age}</p>
               
               <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 mb-2">Tema Atual</h4>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{selectedProgram.theme}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 mb-2">Visão do Curso</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProgram.vision}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 mb-2">Objetivo</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProgram.objective}</p>
                  </div>
               </div>
               
               <button 
                onClick={() => { setSelectedProgram(null); onNavigate(Page.Enrollment); }}
                className="mt-10 w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg"
               >
                 Quero me inscrever
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
