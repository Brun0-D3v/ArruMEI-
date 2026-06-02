import { useState, useEffect } from "react";
import { X, CheckSquare, AlignLeft, AlertCircle } from "lucide-react";
import { supabase } from '../services/supabase';

export function ModalTarefa({ isOpen, onClose, onTarefaSalva, tarefaParaEditar }) {
  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState('media');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (isOpen && tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo || '');
      setPrioridade(tarefaParaEditar.prioridade || 'media');
    } else if (isOpen && !tarefaParaEditar) {
      setTitulo('');
      setPrioridade('media');
    }
    setErro('');
  }, [isOpen, tarefaParaEditar]);

  if (!isOpen) return null;

  const handleClose = () => {
    setTitulo('');
    setPrioridade('media');
    setErro('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (tarefaParaEditar) {
        // MODO EDIÇÃO (UPDATE)
        const { error: updateError } = await supabase
          .from('tarefas')
          .update({ 
            titulo, 
            prioridade 
          })
          .eq('id', tarefaParaEditar.id);

        if (updateError) throw updateError;
      } else {
        // MODO CRIAÇÃO (INSERT) - Ajustado para o seu banco de dados
        const { error: insertError } = await supabase
          .from('tarefas')
          .insert([
            { 
              titulo, 
              prioridade,
              status: 'pendente', // Envia como texto para a coluna status
              usuario_id: userData.user.id 
            }
          ]);

        if (insertError) throw insertError;
      }

      if (onTarefaSalva) {
        onTarefaSalva();
      }
      handleClose();

    } catch (error) {
      console.error(error);
      setErro('Não foi possível salvar a tarefa. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const isEditando = !!tarefaParaEditar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CheckSquare size={20} className="text-arrumei-purple" />
            {isEditando ? 'Editar Task' : 'Nova Task'}
          </h3>
          <button 
            type="button"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Título *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <AlignLeft size={18} />
                </div>
                <input 
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Enviar proposta para o cliente"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Prioridade *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <AlertCircle size={18} />
                </div>
                <select 
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all appearance-none"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
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
              {loading ? 'Processando...' : (isEditando ? 'Atualizar Tarefa' : 'Salvar Tarefa')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}