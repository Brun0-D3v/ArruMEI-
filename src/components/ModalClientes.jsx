import { useState, useEffect } from "react";
import { X, User, Phone, Mail, FileText } from "lucide-react";
import { supabase } from '../services/supabase';

export function ModalClientes({ isOpen, onClose, onClienteSalvo, clienteParaEditar }) {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [observacoes, setObservacoes] = useState('');
  
  // Estados de controlo
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Função para formatar o telefone
  const formatTelefone = (valor) => {
    if (!valor) return '';
    const apenasNumeros = valor.replace(/\D/g, '');
    const limitados = apenasNumeros.slice(0, 11);

    if (limitados.length === 0) return '';
    if (limitados.length <= 2) return `(${limitados}`;
    if (limitados.length <= 7) return `(${limitados.slice(0, 2)}) ${limitados.slice(2)}`;
    return `(${limitados.slice(0, 2)}) ${limitados.slice(2, 7)}-${limitados.slice(7)}`;
  };

  // EFEITO: Preenche o formulário se estivermos a editar um cliente
  useEffect(() => {
    if (isOpen && clienteParaEditar) {
      setNome(clienteParaEditar.nome || '');
      setTelefone(formatTelefone(clienteParaEditar.telefone) || '');
      setEmail(clienteParaEditar.email || '');
      setObservacoes(clienteParaEditar.observacoes || '');
    } else if (isOpen && !clienteParaEditar) {
      // Limpa os campos se for um "Novo Cliente"
      setNome('');
      setTelefone('');
      setEmail('');
      setObservacoes('');
    }
  }, [isOpen, clienteParaEditar]);

  if (!isOpen) return null;

  // Função para limpar o formulário e fechar
  const handleClose = () => {
    setErro('');
    onClose();
  };

  // Função de gravação no banco de dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const telefoneSomenteNumeros = telefone.replace(/\D/g, '');

      // Verifica se é Edição ou Criação
      if (clienteParaEditar) {
        // ATUALIZAR (UPDATE)
        const { error: updateError } = await supabase
          .from('clientes')
          .update({ 
            nome, 
            telefone: telefoneSomenteNumeros, 
            email: email || null,
            observacoes: observacoes || null
          })
          .eq('id', clienteParaEditar.id); // Garante que atualiza apenas a linha certa

        if (updateError) throw updateError;
      } else {
        // CRIAR (INSERT)
        const { error: insertError } = await supabase
          .from('clientes')
          .insert([
            { 
              nome, 
              telefone: telefoneSomenteNumeros, 
              email: email || null,
              observacoes: observacoes || null,
              usuario_id: userData.user.id 
            }
          ]);

        if (insertError) throw insertError;
      }

      if (onClienteSalvo) {
        onClienteSalvo();
      }
      handleClose();

    } catch (error) {
      console.error(error);
      setErro('Não foi possível salvar o cliente. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isEditando = !!clienteParaEditar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="p-1.5 bg-arrumei-purple/10 text-arrumei-purple rounded-lg">
              <User size={18} />
            </div>
            {isEditando ? 'Editar Cliente' : 'Novo Cliente'}
          </h3>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {erro && (
          <div className="mx-6 mt-6 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 flex flex-col gap-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome do Cliente *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Maria Silva"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Telefone / WhatsApp *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    onPaste={(e) => {
                      e.preventDefault();
                      const textoColado = e.clipboardData.getData('text/plain');
                      setTelefone(formatTelefone(textoColado));
                    }}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail (Opcional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cliente@email.com"
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Observações (Opcional)</label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-4 pointer-events-none text-gray-400">
                  <FileText size={18} />
                </div>
                <textarea 
                  rows="3"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Preferências, endereço, detalhes importantes..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all resize-none"
                ></textarea>
              </div>
            </div>

          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
            <button 
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-arrumei-purple hover:bg-arrumei-purple-light dark:bg-arrumei-purple dark:hover:bg-arrumei-purple-light rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'A processar...' : (isEditando ? 'Atualizar Cliente' : 'Salvar Cliente')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}