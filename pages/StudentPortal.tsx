
import React, { useState, useEffect } from 'react';

/**
 * INSTRUÇÕES PARA O BANCO DE DADOS (DATABASE PREPARATION):
 * 
 * Para transformar este portal em um sistema real com banco de dados, você deve:
 * 1. Utilizar um Backend (Node.js/Express, Firebase ou Supabase).
 * 2. Criar uma tabela 'users' com campos: id, email, password (hash), name, current_edition_id.
 * 3. Criar uma tabela 'editions' com campos: id, name, theme, location, dates, guide_pdf_url.
 * 4. No frontend, substituir a função handleLogin por uma chamada à sua API (fetch/axios).
 * 5. Armazenar o token de autenticação (JWT) no LocalStorage ou Cookies.
 */

// Lista de usuários para simulação de login (Edite para testar)
// MOCK_USERS removed. Using backend API.

const StudentPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCategory, setUserCategory] = useState<'kids' | 'teens' | 'adults'>('adults');
  const [selectedCategory, setSelectedCategory] = useState<'kids' | 'teens' | 'adults'>('adults'); // Para o cadastro
  const [error, setError] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Conteúdo dinâmico baseado na categoria
  const CONTENT = {
    adults: {
      title: 'CIM Janeiro 2024 - Adultos',
      theme: 'Ide e Pregai',
      vision: 'Capacitar o aluno para o campo missionário prático, fornecendo ferramentas teológicas e experiências reais.',
      objective: 'Imersão intensiva de 15 dias com aulas teóricas e práticas de evangelismo urbano.',
      schedule: [
        { time: '07:00', title: 'Despertar', type: 'Rotina' },
        { time: '08:30', title: 'Devocional Matinal', type: 'Espiritual' },
        { time: '09:30', title: 'Aula Teológica', type: 'Estudo' },
        { time: '14:00', title: 'Evangelismo de Rua', type: 'Prática' },
        { time: '19:00', title: 'Culto da Noite', type: 'Espiritual' }
      ]
    },
    teens: {
      title: 'CIM Teens 2024',
      theme: 'Geração Eleita',
      vision: 'Despertar adolescentes para o chamado missionário através de dinâmicas, música e serviço.',
      objective: 'Uma experiência radical de fé, amizade e serviço comunitário durante as férias.',
      schedule: [
        { time: '08:00', title: 'Café da Manhã', type: 'Refeição' },
        { time: '09:00', title: 'Louvor & Palavra', type: 'Espiritual' },
        { time: '10:30', title: 'Gincana Bíblica', type: 'Dinâmica' },
        { time: '15:00', title: 'Ação Social', type: 'Prática' },
        { time: '20:00', title: 'Fogueira & Testemunhos', type: 'Comunhão' }
      ]
    },
    kids: {
      title: 'CIM Kids 2024',
      theme: 'Pequenos Missionários',
      vision: 'Ensinar às crianças o amor de Deus e a importância de ajudar o próximo de forma lúdica.',
      objective: 'Atividades recreativas, teatro e histórias bíblicas focadas em missões.',
      schedule: [
        { time: '08:30', title: 'Chegada & Brincadeiras', type: 'Recreação' },
        { time: '09:30', title: 'Hora da História', type: 'Ensino' },
        { time: '10:30', title: 'Lanche', type: 'Refeição' },
        { time: '11:00', title: 'Música e Coreografia', type: 'Arte' },
        { time: '12:00', title: 'Encerramento', type: 'Rotina' }
      ]
    }
  };

  const currentContent = CONTENT[userCategory] || CONTENT.adults;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedEdition = localStorage.getItem('edition');

    if (token && savedUser) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(savedUser).name);

      if (savedEdition) {
        const editionData = JSON.parse(savedEdition);
        if (editionData.category) {
          setUserCategory(editionData.category);
        }
      }
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        setLoading(false);
        return;
      }
      if (!userName) {
        setError('Por favor, informe seu nome.');
        setLoading(false);
        return;
      }
    }

    const endpoint = isRegistering ? 'http://localhost:3001/api/register' : 'http://localhost:3001/api/login';
    const bodyPayload = isRegistering
      ? { name: userName, email, password, category: selectedCategory }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUserName(data.user.name);
        // Atualiza a categoria baseada na edição retornada
        if (data.edition && data.edition.category) {
          setUserCategory(data.edition.category);
          localStorage.setItem('edition', JSON.stringify(data.edition));
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setError(data.error || 'Erro na autenticação');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('edition');
  };

  const handleForgotPassword = () => {
    alert('As instruções para recuperação de senha foram enviadas para o e-mail: ' + (email || 'seu e-mail'));
  };

  const downloadGuide = () => {
    // Simulando download de PDF
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">account_circle</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">{isRegistering ? 'Criar Conta' : 'Área do Aluno'}</h1>
              <p className="text-slate-500 text-sm">{isRegistering ? 'Preencha seus dados para começar.' : 'Acesse sua conta para ver informações da sua edição.'}</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 text-sm rounded-xl border border-red-100 dark:border-red-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-6">
            {isRegistering && (
              <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-xs font-bold uppercase text-slate-400">Nome Completo</label>
                <input
                  required
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Seu Nome"
                />

                <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="text-xs font-bold uppercase text-slate-400">Programa de Interesse</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="adults" className="text-slate-900">Adultos (acima de 18 anos)</option>
                    <option value="teens" className="text-slate-900">Teens (12 a 17 anos)</option>
                    <option value="kids" className="text-slate-900">Kids (5 a 11 anos)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-slate-400">E-mail</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="aluno@cim.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase text-slate-400">Senha</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>

            {isRegistering && (
              <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-xs font-bold uppercase text-slate-400">Confirmar Senha</label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <span className="animate-spin material-symbols-outlined">sync</span> : (isRegistering ? 'Criar Conta' : 'Entrar na Plataforma')}
            </button>

            <div className="flex flex-col gap-2 items-center">
              {!isRegistering && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary text-sm font-bold hover:underline"
                >
                  Esqueci minha senha
                </button>
              )}

              <button
                type="button"
                onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                className="text-slate-500 text-sm hover:text-primary transition-colors mt-2"
              >
                {isRegistering ? 'Já tem uma conta? Faça Login' : 'Não tem uma conta? Crie agora'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black">Bem-vindo, {userName}!</h1>
          <p className="text-slate-500">Prepare-se para a missão. Aqui estão as informações da sua edição.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sair
        </button>
      </div>

      <div className="mb-12 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md flex flex-col lg:flex-row">
        <div className="lg:w-2/5 aspect-video lg:aspect-auto">
          <img src="https://picsum.photos/seed/student/800/600" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="lg:w-3/5 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span className="text-xs font-bold uppercase">05 a 20 de Janeiro, 2024</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-slate-500 mb-8">Tema: <span className="text-slate-900 dark:text-white font-bold">{currentContent.theme}</span> | Local: <span className="text-slate-900 dark:text-white font-bold">Recife, PE</span></p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsDetailsModalOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 transition-all"
            >
              <span className="material-symbols-outlined text-sm">visibility</span> Ver Detalhes
            </button>
            <button
              onClick={downloadGuide}
              className="bg-slate-100 dark:bg-slate-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              <span className="material-symbols-outlined text-sm">download</span> Guia do Aluno (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-orange-500">campaign</span> Mural de Avisos
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { day: '14', month: 'Jan', title: 'Alteração no local do Culto de Envio', desc: 'O culto acontecerá no auditório principal da igreja sede às 19:30.' },
              { day: '10', month: 'Jan', title: 'Check-in Liberado', desc: 'Lembre-se de trazer seu documento original com foto para o credenciamento.' }
            ].map((notice, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-6 hover:shadow-md transition-shadow">
                <div className="size-14 bg-slate-100 dark:bg-slate-700 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
                  <span className="text-[10px] font-bold uppercase text-primary">{notice.month}</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">{notice.day}</span>
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-slate-900 dark:text-white">{notice.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{notice.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-primary">event_upcoming</span> Próximas Atividades
          </h3>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col gap-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-700">
              <div className="relative pl-10">
                <span className="absolute left-0 top-1 size-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-800"></span>
                <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">Hoje, 19:00</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">Culto de Abertura</p>
              </div>
              <div className="relative pl-10">
                <span className="absolute left-0 top-1 size-3 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-800"></span>
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Amanhã, 08:30</p>
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">Café da Manhã & Devocional</p>
              </div>
            </div>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="w-full mt-10 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              Ver Cronograma Completo
            </button>
          </div>
        </div>
      </div>


      {
        isDetailsModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Detalhes da Edição</h2>
                  <p className="text-slate-500">Informações oficiais do programa</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                      Visão do Curso
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentContent.vision}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-sm">target</span>
                      Objetivo Principal
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentContent.objective}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-slate-400 mb-3">Incluso no Pacote</h4>
                    <ul className="space-y-3">
                      {[
                        'Hospedagem completa',
                        '3 Refeições diárias',
                        'Material didático e Camisa',
                        'Certificado de Conclusão'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                          <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => setIsDetailsModalOpen(false)}
                      className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Entendi, vamos lá!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[80vh] flex flex-col rounded-3xl shadow-2xl relative animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Cronograma Oficial</h2>
                <p className="text-xs text-slate-500">Programação sujeita a alterações.</p>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-8">
              {currentContent.schedule.map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Linha conectora */}
                  {i !== 8 && <div className="absolute left-[19px] top-8 bottom-[-32px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>}

                  <div className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-primary/20 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-primary">
                    {i + 1}º
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">{item.time}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                    <span className="text-xs text-slate-500">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button onClick={() => setIsScheduleModalOpen(false)} className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
