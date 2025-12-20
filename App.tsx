
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Home from './pages/Home';
import Enrollment from './pages/Enrollment';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Events from './pages/Events';
import StudentPortal from './pages/StudentPortal';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (Object.values(Page).includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage(Page.Home);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onNavigate={setCurrentPage} />;
      case Page.Enrollment:
        return <Enrollment />;
      case Page.Gallery:
        return <Gallery />;
      case Page.News:
        return <News />;
      case Page.Events:
        return <Events />;
      case Page.StudentPortal:
        return <StudentPortal />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
