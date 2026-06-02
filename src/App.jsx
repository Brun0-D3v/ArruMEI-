import { useState, useEffect } from 'react';
import { supabase } from './services/supabase'; // <-- Importação do Supabase adicionada
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Financeiro } from './components/Financeiro';
import { Agenda } from './components/Agenda';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth'; 
import { Tarefas } from './components/Tarefas';
import { Clientes } from './components/Clientes';

function App() {
  // ESTADOS DE SEGURANÇA (Supabase)
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // ESTADOS DE INTERFACE (A tela ativa agora começa no dashboard por padrão)
  const [telaAtiva, setTelaAtiva] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // EFEITO 1: Verifica o login no banco de dados assim que o app abre
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // EFEITO 2: Gerencia o Dark Mode (Mantido do seu código original)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // TRAVA DE TELA 1: Enquanto o sistema checa a sessão no Supabase
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 font-medium">Carregando ArruMEI...</p>
      </div>
    );
  }

  // TRAVA DE TELA 2: Se o usuário não tiver uma sessão ativa, mostra SÓ o Auth
  if (!session) {
    return <Auth onLogin={() => {}} />;
  }

  // TELA PRINCIPAL: Se passar pelas travas (está logado), renderiza o seu sistema completo
  return (
    <div className="flex h-screen bg-arrumei-bg-light dark:bg-gray-900 transition-colors duration-300 overflow-hidden font-sans">
      
      <Sidebar telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        <main className="flex-1 overflow-y-auto p-8">
          {telaAtiva === 'dashboard' && <Dashboard setTelaAtiva={setTelaAtiva} />}
          {telaAtiva === 'financeiro' && <Financeiro />}
          {telaAtiva === 'agenda' && <Agenda />}
          {telaAtiva === 'tarefas' && <Tarefas/>}
          {telaAtiva === 'clientes' && <Clientes/>}
        </main>

      </div>
    </div>
  );
}

export default App;