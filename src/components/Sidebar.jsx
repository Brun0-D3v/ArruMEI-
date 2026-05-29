import { LayoutDashboard, Calendar, DollarSign, CheckSquare, Users, Zap } from "lucide-react";

// 1. Recebendo as Props para gerenciar a navegação
export function Sidebar({ telaAtiva, setTelaAtiva }) {
    return(
        <aside className="w-[260px] h-full bg-arrumei-purple flex flex-col transition-colors duration-300 rounded-r-2xl shadow-xl z-10">

            {/* Logo */}
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                    <Zap size={20} fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-wide">ArruMEI</h1>
                    <p className="text-[10px] text-white/40 font-semibold mb-2 px-4 uppercase tracking-widest">Gestão Simplificada</p>
                </div>
            </div>

            {/* Navegação Principal */}
            <div className="flex-1 px-4 flex flex-col gap-1">
                <p className="text-[10px] text-white/40 font-semibold mb-2 px-4 uppercase tracking-widest">
                    Principal
                </p>

                {/* 2. Trocando <a> por <button> e adicionando lógica de cor para o item ativo */}
                <button 
                    onClick={() => setTelaAtiva('dashboard')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
                        telaAtiva === 'dashboard' 
                        ? 'bg-white/15 text-white font-bold shadow-sm' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white font-medium'
                    }`}
                >
                    <LayoutDashboard size={18}/>
                    <span className="text-sm">Dashboard</span>
                </button>

                <button 
                    onClick={() => setTelaAtiva('agenda')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
                        telaAtiva === 'agenda' 
                        ? 'bg-white/15 text-white font-bold shadow-sm' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white font-medium'
                    }`}
                >
                    <Calendar size={18} />
                    <span className="text-sm">Agenda</span>
                </button>

                <button 
                    onClick={() => setTelaAtiva('financeiro')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
                        telaAtiva === 'financeiro' 
                        ? 'bg-white/15 text-white font-bold shadow-sm' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white font-medium'
                    }`}
                >
                    <DollarSign size={18}/>
                    <span className="text-sm">Financeiro</span>
                </button>

                {/* 3. Itens fora do escopo atual (comentados para o futuro) */}
                <button
                onClick={() => setTelaAtiva('tarefas')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
                telaAtiva === 'tarefas'
                ? 'bg-white/15 text-white font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white font-medium">
                    <CheckSquare size={18}/>
                    <span className="text-sm font-medium">Tarefas</span>
                </button>
                    
                <button
                onClick={() => setTelaAtiva('clientes')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
                telaAtiva === 'clientes'
                ? 'bg-white/15 text-white font-bold shadow-sm'
                : 'text-white/70 hover:bg-white/5 hover:text-white font-medium">
                    <Users size={18}/>
                    <span className="text-sm font-medium">Clientes</span>
                </button>
            
                
            </div>

            {/* Footer da SideBar */}
            <div className="p-4 mb-4 mx-4 bg-white/5 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                    B
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">Bruno</p>
                    <p className="text-xs text-white/50 truncate">Designer MEI</p>
                </div>
            </div>
        </aside>
    )
}