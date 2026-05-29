import { Search, Bell, Sun, Moon } from 'lucide-react';

export function Header({ toggleTheme, isDarkMode, title = "Financeiro", subtitle = "Controle de entradas e saídas" }) {
  // Pegando a data atual formatada
const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/\./g, ''); // Remove os pontos das abreviações

return (
    <header className="h-24 bg-transparent flex items-center justify-between px-8 transition-colors duration-300">
    
      {/* Título da Página Dinâmico */}
    <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {subtitle}
        </p>
    </div>

      {/* Ações e Ferramentas */}
    <div className="flex items-center gap-4">
        
        {/* Pílula de Data */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="w-1.5 h-1.5 rounded-full bg-arrumei-purple"></div>
        {dataAtual}
        </div>

        {/* Ícone de Busca */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        <Search size={18} />
        </button>

        {/* Ícone de Notificações */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition relative">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>

        {/* Botão de Dark Mode Elegante */}
        <button 
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-arrumei-purple text-white hover:bg-arrumei-purple-light transition shadow-md"
        title="Alternar Tema"
        >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

    </div>
    </header>
);
}