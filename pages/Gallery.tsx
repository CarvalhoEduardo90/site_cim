
import React, { useState } from 'react';
import { GalleryAlbum } from '../types';

/**
 * DADOS DA GALERIA - Edite aqui para adicionar fotos de edições anteriores
 */
const ALBUMS: GalleryAlbum[] = [
  { 
    id: 1, 
    title: 'CIM Teens 2023.1', 
    theme: 'Identidade', 
    year: '2023',
    edition: '1',
    location: 'Guarapari, ES', 
    // Fix: Removed 'date' property as it is not part of the GalleryAlbum interface
    category: 'Teen', 
    photoCount: 4, 
    images: [
      'https://picsum.photos/seed/teens23_1/800/600',
      'https://picsum.photos/seed/teens23_2/800/600',
      'https://picsum.photos/seed/teens23_3/800/600',
      'https://picsum.photos/seed/teens23_4/800/600'
    ] 
  },
  { 
    id: 2, 
    title: 'CIM Teens 2023.2', 
    theme: 'Raízes', 
    year: '2023',
    edition: '2',
    location: 'Caruaru, PE', 
    // Fix: Removed 'date' property as it is not part of the GalleryAlbum interface
    category: 'Teen', 
    photoCount: 3, 
    images: [
      'https://picsum.photos/seed/teens23_j1/800/600',
      'https://picsum.photos/seed/teens23_j2/800/600',
      'https://picsum.photos/seed/teens23_j3/800/600'
    ] 
  },
  { 
    id: 3, 
    title: 'CIM Kids 2023.1', 
    theme: 'O Criador', 
    year: '2023',
    edition: '1',
    location: 'Vitória, ES', 
    // Fix: Removed 'date' property as it is not part of the GalleryAlbum interface
    category: 'Kids', 
    photoCount: 3, 
    images: [
      'https://picsum.photos/seed/kids23_1/800/600',
      'https://picsum.photos/seed/kids23_2/800/600',
      'https://picsum.photos/seed/kids23_3/800/600'
    ] 
  },
  { 
    id: 4, 
    title: 'CIM Adultos 2022.2', 
    theme: 'Missio Dei', 
    year: '2022',
    edition: '2',
    location: 'Serra, ES', 
    // Fix: Removed 'date' property as it is not part of the GalleryAlbum interface
    category: 'Adultos', 
    photoCount: 3, 
    images: [
      'https://picsum.photos/seed/adults22_1/800/600',
      'https://picsum.photos/seed/adults22_2/800/600',
      'https://picsum.photos/seed/adults22_3/800/600'
    ] 
  }
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAlbum, setActiveAlbum] = useState<{ images: string[], index: number, title: string } | null>(null);

  const filteredAlbums = ALBUMS.filter(album => {
    const matchesFilter = filter === 'Todos' || album.category === filter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      album.title.toLowerCase().includes(term) || 
      album.year.includes(term) || 
      album.theme.toLowerCase().includes(term) ||
      (album.edition === '1' && 'janeiro'.includes(term)) ||
      (album.edition === '2' && 'julho'.includes(term));
      
    return matchesFilter && matchesSearch;
  });

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setActiveAlbum({
      ...activeAlbum,
      index: (activeAlbum.index + 1) % activeAlbum.images.length
    });
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setActiveAlbum({
      ...activeAlbum,
      index: (activeAlbum.index - 1 + activeAlbum.images.length) % activeAlbum.images.length
    });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative bg-background-dark py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://picsum.photos/seed/galleryhero/1280/600" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
           <h1 className="text-4xl md:text-6xl font-black mb-4">Galeria de Momentos</h1>
           <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Busque por edição (Kids/Adolescente/Adulto), ano ou tema.</p>
           <div className="max-w-xl mx-auto flex items-center bg-white/10 backdrop-blur rounded-2xl p-2 border border-white/20">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: 2023, Janeiro, Teen..." 
                className="flex-grow bg-transparent border-none text-white focus:ring-0 placeholder-gray-400" 
              />
              <div className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">search</span>
                Buscar
              </div>
           </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
           {['Todos', 'Kids', 'Teen', 'Adultos'].map(cat => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-8 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        {filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAlbums.map((album) => (
              <article 
                key={album.id} 
                onClick={() => setActiveAlbum({ images: album.images, index: 0, title: album.title })}
                className="group flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={album.images[0]} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="material-symbols-outlined text-white text-4xl">collections</span>
                  </div>
                  <div className={`absolute top-4 right-4 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    album.category === 'Kids' ? 'bg-purple-500' : album.category === 'Teen' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {album.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-white text-xs font-bold">
                    {album.year}.{album.edition}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black group-hover:text-primary transition-colors mb-1">{album.title}</h3>
                  <p className="text-primary font-bold text-sm mb-2 italic">Tema: {album.theme}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {album.location}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">{album.photoCount} fotos</span>
                    <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-all">Ver Álbum <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
            <p className="text-slate-500">Nenhum álbum encontrado para sua busca. Tente filtrar por "Teen", "2023" ou "Janeiro".</p>
          </div>
        )}
      </section>

      {/* Lightbox / Carousel */}
      {activeAlbum && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setActiveAlbum(null)}
        >
          <div className="absolute top-6 left-6 text-white font-black text-xl flex items-center gap-3">
             <span className="material-symbols-outlined text-primary">photo_library</span>
             {activeAlbum.title}
          </div>
          <button className="absolute top-6 right-6 text-white text-4xl z-50 hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-6 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all z-50 disabled:opacity-30"
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <img 
              src={activeAlbum.images[activeAlbum.index]} 
              className="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain animate-in zoom-in-95 duration-300" 
              alt="Preview" 
            />
            <div className="mt-6 text-white font-bold bg-white/10 px-6 py-2 rounded-full backdrop-blur">
              {activeAlbum.index + 1} / {activeAlbum.images.length}
            </div>
          </div>

          <button 
            onClick={nextImage}
            className="absolute right-6 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all z-50 disabled:opacity-30"
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
