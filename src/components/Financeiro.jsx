import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Search, ArrowUpRight, ArrowDownLeft, SlidersHorizontal, Plus, AlertCircle, CalendarRange, ArrowUp, ArrowDown } from 'lucide-react';
import { ModalLancamento } from './ModalLancamento';

// Nosso "Banco de Dados" temporário (Mockup)
const historicoTransacoes = [
{
    data: "QUARTA-FEIRA, 18 DE MARÇO",
    itens: [
    { id: 1, titulo: "Serviço de design - Maria Silva", categoria: "Serviços", tipo: "entrada", valor: "+R$ 1.200,00" }
    ]
},
{
    data: "TERÇA-FEIRA, 17 DE MARÇO",
    itens: [
    { id: 2, titulo: "Consultoria João Ferreira", categoria: "Consultoria", tipo: "entrada", valor: "+R$ 800,00" }
    ]
},
{
    data: "SEGUNDA-FEIRA, 16 DE MARÇO",
    itens: [
    { id: 3, titulo: "Assinatura Adobe CC", categoria: "Software", tipo: "saida", valor: "-R$ 350,00" }
    ]
},
{
    data: "DOMINGO, 15 DE MARÇO",
    itens: [
    { id: 4, titulo: "Projeto identidade visual", categoria: "Serviços", tipo: "entrada", valor: "+R$ 2.500,00" }
    ]
},
{
    data: "SÁBADO, 14 DE MARÇO",
    itens: [
    { id: 5, titulo: "Material de escritório", categoria: "Material", tipo: "saida", valor: "-R$ 180,00" }
    ]
}
];

// 1. Nossa "Fôrma de Bolo" ATUALIZADA (Agora aceita tendências)
function CardResumo({ titulo, valor, subtitulo, icone: Icone, tipo, tendencia }) {
let bgCard = "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm";
let corTextoValor = "text-gray-900 dark:text-white";
let bgIcone = "bg-gray-100 dark:bg-gray-700 text-gray-500";

if (tipo === 'principal') {
    bgCard = "bg-arrumei-purple text-white shadow-lg relative overflow-hidden border-none";
    corTextoValor = "text-white";
    bgIcone = "bg-white/20 text-white";
} 
else if (tipo === 'entrada') {
    corTextoValor = "text-green-600 dark:text-green-400";
    bgIcone = "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
} 
else if (tipo === 'saida') {
    corTextoValor = "text-red-600 dark:text-red-400";
    bgIcone = "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
}

return (
    <div className={`p-6 rounded-2xl ${bgCard} flex flex-col gap-4 transition-colors duration-300`}>
    {tipo === 'principal' && (
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    )}
    
    <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgIcone}`}>
            <Icone size={20} />
        </div>
        <p className={`text-[11px] font-bold tracking-wider uppercase ${tipo === 'principal' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
            {titulo}
        </p>
        </div>
        
        {/* NOVA PARTE: Etiqueta de Tendência */}
        {tendencia && (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
            tendencia.positiva 
            ? (tipo === 'principal' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400')
            : (tipo === 'principal' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400')
        }`}>
            {tendencia.positiva ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {tendencia.valor}
        </div>
        )}
    </div>

    <div className="relative z-10">
        <h3 className={`text-3xl font-bold ${corTextoValor}`}>{valor}</h3>
        <p className={`text-xs mt-1 ${tipo === 'principal' ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}>
        {subtitulo}
        </p>
    </div>
    </div>
);
}

// 2. O Componente Principal da Tela
export function Financeiro() {
    const [isModalOpen , setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('receita');

    const handleOpenModal = (tipo) => {
        setModalType(tipo);
        setIsModalOpen(true);
    };
return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-10">

      {/* Cabeçalho de Ações (CTAs) */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visão Geral</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Acompanhe e gerencie seu fluxo de caixa.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
           
            
        <button
         onClick={() => handleOpenModal('despesa')}
         className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold text-sm transition-all duration-300">
            <TrendingDown size={18} />
            Nova despesa
        </button>
        <button
        onClick={() => handleOpenModal('receita')}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-arrumei-purple hover:bg-arrumei-purple-light dark:bg-arrumei-purple dark:hover:bg-arrumei-purple-light text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
            <Plus size={18} />
            Nova receita
        </button>
        </div>
    </div>

      {/* --- NOVA PARTE: Alerta DAS-MEI --- */}
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-start sm:items-center gap-3">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-600 dark:text-amber-500 shrink-0">
            <AlertCircle size={20} />
        </div>
        <div>
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Lembrete: DAS-MEI vence dia 20</p>
            <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">Evite multas. O valor deste mês é de aproximadamente R$ 75,60.</p>
        </div>
        </div>
        <button className="whitespace-nowrap px-4 py-2 bg-amber-200 hover:bg-amber-300 dark:bg-amber-700/50 dark:hover:bg-amber-700/80 text-amber-900 dark:text-amber-100 text-sm font-semibold rounded-xl transition-colors">
        Marcar como pago
        </button>
    </div>
        
      {/* Linha 1: Os 3 Cartões (AGORA COM TENDÊNCIAS) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardResumo 
        titulo="Saldo Atual" valor="R$ 4.244,10" subtitulo="Março 2026" icone={DollarSign} tipo="principal" 
        tendencia={{ valor: "12%", positiva: true }} 
        />
        <CardResumo 
        titulo="Total Entradas" valor="R$ 5.100,00" subtitulo="vs. mês passado" icone={TrendingUp} tipo="entrada" 
        tendencia={{ valor: "8.5%", positiva: true }} 
        />
        <CardResumo 
        titulo="Total Saídas" valor="R$ 855,90" subtitulo="vs. mês passado" icone={TrendingDown} tipo="saida" 
        tendencia={{ valor: "2.1%", positiva: false }} 
        />
    </div>

      {/* Seção de Lista de Transações */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        
        {/* Cabeçalho de Filtros e Busca */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-arrumei-purple text-white text-sm font-medium rounded-lg shadow-sm whitespace-nowrap">
            <SlidersHorizontal size={14} />
            Todos
            </button>
            <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">Entradas</button>
            <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">Saídas</button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            {/* NOVA PARTE: Botão de Filtro de Período */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-all whitespace-nowrap shadow-sm">
            <CalendarRange size={16} />
            Este Mês
            </button>

            {/* Campo de Busca */}
            <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Buscar transação..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
            />
            </div>
            {isModalOpen && (
                <ModalLancamento
                    tipo={modalType}
                    onClose={() => setIsModalOpen(false)}
            />        
            )} 
        </div>
        </div>

        {/* Lista de Transações */}
        <div>
        {historicoTransacoes.map((grupoDeData, index) => (
            <div key={index}>
            <div className="px-6 py-3 bg-gray-50/50 dark:bg-gray-800/20 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                {grupoDeData.data}
            </div>
            {grupoDeData.itens.map((transacao) => (
                <div key={transacao.id} className="px-6 py-4 flex items-center justify-between border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${transacao.tipo === 'entrada' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {transacao.tipo === 'entrada' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                    </div>
                    <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-arrumei-purple dark:group-hover:text-arrumei-purple-light transition-colors">
                        {transacao.titulo}
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-medium border border-gray-200 dark:border-gray-700">
                        {transacao.categoria}
                    </span>
                    </div>
                </div>
                <span className={`text-sm font-bold ${transacao.tipo === 'entrada' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transacao.valor}
                </span>
                </div>
            ))}
            </div>
        ))}
        </div>
    </div>

    {/* Modal se injeta aqui*/}
    <ModalLancamento
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    tipo={modalType}
    />
    </div>
);
}