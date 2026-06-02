import { useState, useEffect } from 'react';
import { Search, Plus, User, Phone, Mail, FileText, Calendar, Edit2, Trash2 } from 'lucide-react';
import { ModalClientes } from './ModalClientes';
import { supabase } from '../services/supabase';

const cores = [
  "bg-teal-600", "bg-green-600", "bg-orange-600", 
  "bg-red-600", "bg-purple-600", "bg-blue-600", "bg-pink-600"
];

const getIniciais = (nome) => {
  if (!nome) return '';
  const partes = nome.trim().split(' ');
  if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
  return partes[0].substring(0, 2).toUpperCase();
};

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  
  // Controlo do modal e estados de edição/exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteParaEditar, setClienteParaEditar] = useState(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false); // Novo estado para a exclusão inline

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;

      const clientesFormatados = data.map((cliente, index) => ({
        ...cliente,
        iniciais: getIniciais(cliente.nome),
        cor: cores[index % cores.length],
        atendimentos: 0, 
        historico: [] 
      }));

      setClientes(clientesFormatados);
      
      if (clienteSelecionado) {
        const atualizado = clientesFormatados.find(c => c.id === clienteSelecionado.id);
        setClienteSelecionado(atualizado || null);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNovoCliente = () => {
    setClienteParaEditar(null);
    setIsModalOpen(true);
  };

  const handleEditarCliente = () => {
    setClienteParaEditar(clienteSelecionado);
    setIsModalOpen(true);
  };

  // Função de exclusão (agora sem o window.confirm)
  const handleExcluirCliente = async () => {
    if (!clienteSelecionado) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', clienteSelecionado.id);

      if (error) throw error;

      // Limpa os estados e recarrega a lista
      setClienteSelecionado(null);
      setConfirmandoExclusao(false);
      fetchClientes();

    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      alert("Não foi possível excluir o cliente. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full h-[calc(100vh-8rem)] pb-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Atendimentos e histórico</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
        
        <div className="w-full md:w-1/3 lg:w-80 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden shrink-0">
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white">Lista de Clientes</h3>
              <button
               onClick={handleNovoCliente}
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

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center p-8 text-gray-400">
                A carregar clientes...
              </div>
            ) : (
              clientesFiltrados.map((cliente) => (
                <button
                  key={cliente.id}
                  onClick={() => {
                    setClienteSelecionado(cliente);
                    setConfirmandoExclusao(false); // Reseta a confirmação ao mudar de cliente
                  }}
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
              ))
            )}
            
            {!loading && clientesFiltrados.length === 0 && (
              <p className="text-center text-sm text-gray-400 p-6">Nenhum cliente encontrado.</p>
            )}
          </div>
          
          <div className="p-3 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <span className="text-xs font-semibold text-gray-400">{clientes.length} clientes cadastrados</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {!clienteSelecionado ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-6 text-center animate-in fade-in">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <User size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Selecione um cliente</h3>
              <p className="text-sm">Clique na lista ao lado para ver os detalhes completos e o histórico de atendimentos.</p>
            </div>
          ) : (
            
            <div className="flex-1 flex flex-col overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between bg-gray-50/30 dark:bg-gray-800/10">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm ${clienteSelecionado.cor}`}>
                    {clienteSelecionado.iniciais}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{clienteSelecionado.nome}</h2>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1"><Phone size={14}/> {clienteSelecionado.telefone || 'Sem telefone'}</span>
                      {clienteSelecionado.email && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1"><Mail size={14}/> {clienteSelecionado.email}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                
                {/* Substituição dos Botões Padrão pela Barra de Confirmação Inline */}
                <div className="flex gap-2">
                  {confirmandoExclusao ? (
                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-1.5 rounded-xl border border-red-100 dark:border-red-800 animate-in fade-in zoom-in-95 duration-200">
                      <span className="text-xs text-red-600 dark:text-red-400 font-semibold px-2">Excluir cliente?</span>
                      <button 
                        onClick={() => setConfirmandoExclusao(false)}
                        className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors shadow-sm"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={handleExcluirCliente}
                        disabled={loading}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Aguarde...' : 'Sim, excluir'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={handleEditarCliente} 
                        className="p-2 text-gray-400 hover:text-arrumei-purple hover:bg-purple-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setConfirmandoExclusao(true)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="p-8 flex flex-col gap-8">
                
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                    <FileText size={16} className="text-arrumei-purple" />
                    Observações do Cliente
                  </h4>
                  <div className="p-4 bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {clienteSelecionado.observacoes || "Nenhuma observação registada para este cliente."}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-arrumei-purple" />
                    Histórico de Atendimentos
                  </h4>
                  
                  {clienteSelecionado.historico.length === 0 ? (
                    <div className="text-sm text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                      Nenhum atendimento registado ainda.
                    </div>
                  ) : (
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
                  )}
                </div>

              </div>
            </div>
            
          )}
        </div>
        
        <ModalClientes
           isOpen={isModalOpen}
           onClose={() => {
             setIsModalOpen(false);
             setClienteParaEditar(null); 
           }}
           onClienteSalvo={fetchClientes} 
           clienteParaEditar={clienteParaEditar}
        />
      </div>
    </div>
  );
}