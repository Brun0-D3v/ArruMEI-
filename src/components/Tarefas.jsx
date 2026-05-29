import { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw, Plus, Trash2, Edit2 } from 'lucide-react';

// Nosso Mockup Inicial de Tarefas
const mockTarefasIniciais = [
  { id: 1, titulo: "Enviar proposta para Maria Silva", prioridade: "alta", isCompleted: false },
  { id: 2, titulo: "Emitir nota fiscal - João Ferreira", prioridade: "alta", isCompleted: false },
  { id: 3, titulo: "Preparar apresentação - reunião Ana Paula", prioridade: "alta", isCompleted: false },
  { id: 4, titulo: "Responder emails pendentes", prioridade: "media", isCompleted: false },
  { id: 5, titulo: "Renovar certificado digital", prioridade: "media", isCompleted: false },
  { id: 6, titulo: "Atualizar portfólio no site", prioridade: "media", isCompleted: true },
  { id: 7, titulo: "Conferir extrato bancário", prioridade: "baixa", isCompleted: true },
];

export function Tarefas() {
  const [tarefas, setTarefas] = useState(mockTarefasIniciais);
  const [filtroAtivo, setFiltroAtivo] = useState('todas'); // 'todas', 'pendentes', 'concluidas'

  // --- MATEMÁTICA DO PROGRESSO (Estado Derivado) ---
  const totalTarefas = tarefas.length;
  const concluidas = tarefas.filter(t => t.isCompleted).length;
  const pendentes = totalTarefas - concluidas;
  const porcentagem = totalTarefas === 0 ? 0 : Math.round((concluidas / totalTarefas) * 100);

  // --- LÓGICA DE AÇÕES ---
  const toggleTarefa = (id) => {
    setTarefas(tarefas.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const deletarTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const reiniciarTarefas = () => {
    setTarefas(tarefas.map(t => ({ ...t, isCompleted: false })));
  };

  // --- FILTRAGEM ---
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtroAtivo === 'pendentes') return !t.isCompleted;
    if (filtroAtivo === 'concluidas') return t.isCompleted;
    return true;
  });

  // Função auxiliar para as cores da badge de prioridade
  const getBadgeColors = (prioridade, isCompleted) => {
    if (isCompleted) return 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500';
    switch (prioridade) {
      case 'alta': return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'media': return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'; // Roxo conforme a regra de negócio
      case 'baixa': return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tarefas do dia</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={reiniciarTarefas}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-sm transition-all"
          >
            <RotateCcw size={16} /> Reiniciar
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-arrumei-purple hover:bg-arrumei-purple-light text-white font-semibold text-sm shadow-md transition-all">
            <Plus size={18} /> Nova tarefa
          </button>
        </div>
      </div>

      {/* CARD DE PROGRESSO */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Progresso do dia</p>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-black text-gray-900 dark:text-white leading-none">{concluidas}</span>
            <span className="text-lg font-medium text-gray-400 mb-1">/ {totalTarefas} tarefas</span>
          </div>
          
          {/* Barra Horizontal */}
          <div className="w-full max-w-md h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-arrumei-purple transition-all duration-700 ease-out" 
              style={{ width: `${porcentagem}%` }}
            ></div>
          </div>
          
          {/* Legenda */}
          <div className="flex gap-4 text-sm font-medium">
            <span className="text-gray-400">{pendentes} pendentes</span>
            <span className="text-green-500">{concluidas} concluídas</span>
          </div>
        </div>

        {/* Gráfico Circular (SVG) */}
        <div className="hidden sm:flex relative items-center justify-center w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50 dark:text-gray-800" />
            <circle 
              cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={42 * 2 * Math.PI} 
              strokeDashoffset={42 * 2 * Math.PI - (porcentagem / 100) * (42 * 2 * Math.PI)} 
              className="text-arrumei-purple transition-all duration-1000 ease-out" 
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-lg font-bold text-gray-900 dark:text-white">{porcentagem}%</span>
        </div>
      </div>

      {/* ABAS DE FILTRO */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setFiltroAtivo('todas')}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${filtroAtivo === 'todas' ? 'bg-arrumei-purple text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'}`}
        >
          Todas <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${filtroAtivo === 'todas' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>{totalTarefas}</span>
        </button>
        <button 
          onClick={() => setFiltroAtivo('pendentes')}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${filtroAtivo === 'pendentes' ? 'bg-arrumei-purple text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'}`}
        >
          Pendentes <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${filtroAtivo === 'pendentes' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>{pendentes}</span>
        </button>
        <button 
          onClick={() => setFiltroAtivo('concluidas')}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${filtroAtivo === 'concluidas' ? 'bg-arrumei-purple text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'}`}
        >
          Concluídas <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${filtroAtivo === 'concluidas' ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>{concluidas}</span>
        </button>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="flex flex-col gap-3">
        {tarefasFiltradas.map((tarefa) => (
          <div 
            key={tarefa.id} 
            className={`group flex items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-300 ${
              tarefa.isCompleted 
              ? 'border-gray-50 dark:border-gray-800 opacity-60' 
              : 'border-gray-100 dark:border-gray-800 hover:border-arrumei-purple/30 shadow-sm'
            }`}
          >
            
            {/* Lado Esquerdo: Checkbox + Título */}
            <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleTarefa(tarefa.id)}>
              <div className="shrink-0 transition-transform duration-200 active:scale-75">
                {tarefa.isCompleted ? (
                  <CheckCircle2 className="text-arrumei-purple fill-arrumei-purple/20" size={24} />
                ) : (
                  <Circle className="text-gray-300 dark:text-gray-600 hover:text-arrumei-purple transition-colors" size={24} />
                )}
              </div>
              <span className={`text-base font-medium transition-all ${
                tarefa.isCompleted 
                ? 'text-gray-400 dark:text-gray-500 line-through' 
                : 'text-gray-700 dark:text-gray-200'
              }`}>
                {tarefa.titulo}
              </span>
            </div>

            {/* Lado Direito: Badge + Ações Ocultas */}
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1.5 ${getBadgeColors(tarefa.prioridade, tarefa.isCompleted)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tarefa.isCompleted ? 'bg-gray-400' : 'bg-current'}`}></span>
                {tarefa.prioridade}
              </span>

              {/* Botões de Ação (Aparecem no Hover do mouse) */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-arrumei-purple hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => deletarTarefa(tarefa.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}

        {/* Empty State caso filtre e não tenha nada */}
        {tarefasFiltradas.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            Nenhuma tarefa encontrada nesta categoria.
          </div>
        )}
      </div>

    </div>
  );
}