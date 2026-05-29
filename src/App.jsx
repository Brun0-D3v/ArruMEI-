import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Financeiro } from './components/Financeiro';
import { Agenda } from './components/Agenda';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth'; // 1. Nova Importação
import {Tarefas} from './components/Tarefas';
import {Clientes} from './components/Clientes';

function App() {
  // Começamos o sistema na tela de 'login'
  const [telaAtiva, setTelaAtiva] = useState('login');
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Se a tela ativa for 'login', renderiza SOMENTE a tela de autenticação
  if (telaAtiva === 'login') {
    return <Auth onLogin={setTelaAtiva} />;
  }

  // Se não for 'login', renderiza o sistema normal com Sidebar e Header
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