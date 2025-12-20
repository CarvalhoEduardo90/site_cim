
import React, { useState, useEffect } from 'react';
import { Page, NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems: NavItem[] = [
    { label: 'Início', page: Page.Home },
    { label: 'Inscrições', page: Page.Enrollment },
    { label: 'Eventos', page: Page.Events },
    { label: 'Galeria', page: Page.Gallery },
    { label: 'Notícias', page: Page.News },
    { label: 'Área do Aluno', page: Page.StudentPortal },
  ];

  const handleNavClick = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <header className="sticky top-0 z-[9999] w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick(Page.Home)}>
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[28px]">public</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">CIM SEMADEC</h2>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors ${currentPage === item.page
                    ? 'text-primary font-bold'
                    : 'text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Alternar Tema"
              >
                <span className="material-symbols-outlined">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button
                onClick={() => handleNavClick(Page.Enrollment)}
                className="bg-primary hover:bg-blue-600 text-white text-sm font-bold h-10 px-6 rounded-lg transition-colors shadow-sm"
              >
                Inscreva-se
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-500 dark:text-slate-400"
            >
              <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-700 dark:text-white">
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>


      </header>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] z-[9998] bg-white dark:bg-background-dark animate-in slide-in-from-top duration-300 overflow-y-auto shadow-2xl">
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`flex items-center gap-4 p-4 rounded-xl text-lg font-semibold transition-all ${currentPage === item.page
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-900 dark:text-slate-300'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleNavClick(Page.Enrollment)}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-14 rounded-xl transition-colors shadow-md"
              >
                Inscreva-se Agora
              </button>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                  <span className="material-symbols-outlined text-[20px]">public</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold">CIM SEMADEC</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Escola de Missões dedicada a formar, capacitar e enviar vocacionados para os campos do Brasil e do mundo.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 dark:text-white font-bold mb-4">Navegação</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                {navItems.map(item => (
                  <li key={item.page}>
                    <button onClick={() => handleNavClick(item.page)} className="hover:text-primary transition-colors text-left">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 dark:text-white font-bold mb-4">Programas</h3>
              <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                <li><button onClick={() => handleNavClick(Page.Enrollment)} className="hover:text-primary transition-colors text-left">CIM Kids</button></li>
                <li><button onClick={() => handleNavClick(Page.Enrollment)} className="hover:text-primary transition-colors text-left">CIM Teens</button></li>
                <li><button onClick={() => handleNavClick(Page.Enrollment)} className="hover:text-primary transition-colors text-left">CIM Adultos</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 dark:text-white font-bold mb-4">Fale Conosco</h3>
              <ul className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span>contato@cimsemadec.com.br</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <span>(27) 99999-9999</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-slate-400">
              © 2024 CIM SEMADEC. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a className="hover:text-slate-600 dark:hover:text-slate-200" href="#">Privacidade</a>
              <a className="hover:text-slate-600 dark:hover:text-slate-200" href="#">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
