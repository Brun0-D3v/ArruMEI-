import { useState } from 'react';
import { Search, Plus, User, Phone, Mail, FileText, Calendar, Edit2, Trash2 } from 'lucide-react';
import { ModalClientes } from './ModalClientes';

// Banco de Dados Mockado baseado no seu design
const mockClientes = [
  { 
    id: 1, nome: "Maria Silva", iniciais: "MS", cor: "bg-teal-600", atendimentos: 3, 
    telefone: "(81) 99999-1111", email: "maria.silva@email.com", 
    observacoes: "Prefere contato por WhatsApp na parte da manhã. Cliente fiel.",
    historico: [{ data: "15/05/2026", servico: "Criação de Logo" }, { data: "10/04/2026", servico: "Cartão de Visita" }]
  },
  { 
    id: 2, nome: "João Ferreira", iniciais: "JF", cor: "bg-green-600", atendimentos: 2, 
    telefone: "(81) 98888-2222", email: "joao.ferreira@email.com", 
    observacoes: "Sempre pede nota fiscal detalhada.",
    historico: [{ data: "20/05/2026", servico: "Consultoria Inicial" }]
  },
  { 
    id: 3, nome: "Fernanda Costa", iniciais: "FC", cor: "bg-orange-600", atendimentos: 1, 
    telefone: "(81) 97777-3333", email: "nanda.costa@email.com", 
    observacoes: "Primeiro contato via Instagram.",
    historico: [{ data: "22/05/2026", servico: "Orçamento de Identidade Visual" }]
  },
  { 
    id: 4, nome: "Ana Paula Rodrigues", iniciais: "AP", cor: "bg-red-600", atendimentos: 3, 
    telefone: "(81) 96666-4444", email: "", 
    observacoes: "Pendente de resposta sobre a última alteração do projeto.",
    historico: [{ data: "05/05/2026", servico: "Revisão de Artes" }]
  },
  { 
    id: 5, nome: "Carlos Mendes", iniciais: "CM", cor: "bg-purple-600", atendimentos: 1, 
    telefone: "(81) 95555-5555", email: "carlos.m@email.com", 
    observacoes: "Cliente corporativo.",
    historico: [{ data: "01/04/2026", servico: "Apresentação Comercial" }]
  }
];

export function Clientes() {
  const [busca, setBusca] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtro de busca em tempo real
  const clientesFiltrados = mockClientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full h-[calc(100vh-8rem)] pb-6">
      
      {/* HEADER DA TELA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Atendimentos e histórico</p>
        </div>
      </div>

      {/* ÁREA PRINCIPAL (SPLIT VIEW) */}
      <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
        
        {/* PAINEL ESQUERDO: LISTA DE CLIENTES */}
        <div className="w-full md:w-1/3 lg:w-80 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden shrink-0">
          
          {/* Busca e Botão de Novo Cliente */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white">Lista de Clientes</h3>
              <button
               onClick={() => setIsModalOpen(true)}
               className="w-8 h-8 flex items-center justify-center bg-arrumei-purple text-white rounded-lg hover:bg-arrumei-purple-light transition-colors shadow-sm">
                <Plus size={18} />
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
              />
            </div>
          </div>

          {/* Lista Rolável */}
          <div className="flex-1 overflow-y-auto">
            {clientesFiltrados.map((cliente) => (
              <button
                key={cliente.id}
                onClick={() => setClienteSelecionado(cliente)}
                className={`w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800/50 transition-colors text-left ${
                  clienteSelecionado?.id === cliente.id 
                  ? 'bg-arrumei-purple/5 dark:bg-arrumei-purple/10 border-l-4 border-l-arrumei-purple' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${cliente.cor}`}>
                    {cliente.iniciais}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{cliente.nome}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cliente.atendimentos} atendimentos</p>
                  </div>
                </div>
              </button>
            ))}
            {clientesFiltrados.length === 0 && (
              <p className="text-center text-sm text-gray-400 p-6">Nenhum cliente encontrado.</p>
            )}
          </div>
          
          <div className="p-3 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <span className="text-xs font-semibold text-gray-400">{mockClientes.length} clientes cadastrados</span>
          </div>
        </div>

        {/* PAINEL DIREITO: DETALHES DO CLIENTE */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* Empty State (Nenhum cliente selecionado) */}
          {!clienteSelecionado ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-6 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <User size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Selecione um cliente</h3>
              <p className="text-sm">Clique na lista ao lado para ver os detalhes completos e o histórico de atendimentos.</p>
            </div>
          ) : (
            
            /* Detalhes do Cliente Selecionado */
            <div className="flex-1 flex flex-col overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Cabeçalho do Perfil */}
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between bg-gray-50/30 dark:bg-gray-800/10">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm ${clienteSelecionado.cor}`}>
                    {clienteSelecionado.iniciais}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{clienteSelecionado.nome}</h2>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1"><Phone size={14}/> {clienteSelecionado.telefone}</span>
                      {clienteSelecionado.email && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1"><Mail size={14}/> {clienteSelecionado.email}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-arrumei-purple hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Informações e Histórico */}
              <div className="p-8 flex flex-col gap-8">
                
                {/* Seção de Observações */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FileText size={16} className="text-arrumei-purple" />
                    Observações do Cliente
                  </h4>
                  <div className="p-4 bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {clienteSelecionado.observacoes || "Nenhuma observação registrada para este cliente."}
                    </p>
                  </div>
                </div>

                {/* Seção de Histórico */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-arrumei-purple" />
                    Histórico de Atendimentos
                  </h4>
                  <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                    {clienteSelecionado.historico.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b last:border-0 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-arrumei-purple"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.servico}</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                          {item.data}
                        </span>
                      </div>
                    ))}
                    
                  </div>
                </div>

              </div>
            </div>
            
          )}
        </div>
                <ModalClientes
                          isOpen={isModalOpen}
                           onClose={() => setIsModalOpen(false)}
                        />
      </div>
    </div>
    
  );
}