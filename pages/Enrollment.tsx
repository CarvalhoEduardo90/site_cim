
import React from 'react';

const Enrollment: React.FC = () => {
  const handleEnrollClick = (url: string) => {
    window.open(url, '_blank');
  };

  const forms = {
    kids: 'https://forms.gle/exampleKids',
    teens: 'https://forms.gle/exampleTeens',
    adults: 'https://forms.gle/exampleAdults'
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-10 px-6 py-10">
      <section className="w-full">
        <div className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center rounded-3xl items-center justify-center p-8 relative overflow-hidden shadow-2xl group" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://picsum.photos/seed/enroll/1200/800")'}}>
          <div className="flex flex-col gap-4 text-center z-10 max-w-[720px]">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black drop-shadow-md">Inscreva-se na Missão</h1>
            <p className="text-gray-200 text-lg">Escolha abaixo o programa que melhor se adapta à sua faixa etária. Você será redirecionado para o formulário oficial.</p>
          </div>
        </div>
      </section>

      <section id="edicoes" className="flex flex-col gap-8">
        <h2 className="text-3xl font-black">Selecione seu Programa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'CIM Kids', location: 'Recife - PE', month: 'Janeiro', color: 'bg-purple-500', link: forms.kids },
            { name: 'CIM Teens', location: 'Caruaru - PE', month: 'Julho', color: 'bg-orange-500', link: forms.teens },
            { name: 'CIM Adultos', location: 'Garanhuns - PE', month: 'Janeiro', color: 'bg-blue-500', link: forms.adults },
          ].map((item) => (
            <div key={item.name} className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
              <div className={`size-12 rounded-xl ${item.color} flex items-center justify-center text-white mb-2`}>
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span>{item.location}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-primary">{item.month} 2024</div>
              <button 
                onClick={() => handleEnrollClick(item.link)}
                className="mt-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Inscrever-se <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-black mb-8">Dúvidas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: 'O que devo levar na mala?', a: 'Roupas confortáveis, Bíblia, caderno, caneta, itens de higiene pessoal e muita disposição.' },
            { q: 'Quais as formas de pagamento?', a: 'As informações de pagamento são enviadas após o preenchimento do formulário no Google Forms.' },
            { q: 'Tem idade mínima?', a: 'Sim, cada edição tem sua faixa etária: Kids (5-11), Teens (12-17), Adultos (18+).' },
            { q: 'Precisa de autorização?', a: 'Para menores de 18 anos, é obrigatório o envio da autorização assinada pelos responsáveis.' },
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
               <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                 <span className="material-symbols-outlined text-[18px]">help_center</span>
                 {faq.q}
               </h4>
               <p className="text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Enrollment;
