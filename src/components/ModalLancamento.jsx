import { X } from 'lucide-react';

export function ModalLancamento({ isOpen, onClose, tipo }) {
  // Se o modal não estiver aberto, não renderiza nada na tela (esconde)
if (!isOpen) return null;

  // Lógica de Cores e Textos Dinâmicos baseados no 'tipo' (receita ou despesa)
const isReceita = tipo === 'receita';
const titulo = isReceita ? 'Nova Receita' : 'Nova Despesa';
const corBotao = isReceita 
    ? 'bg-arrumei-purple hover:bg-arrumei-purple-light dark:bg-arrumei-purple dark:hover:bg-arrumei-purple-light' 
    : 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700';

  // Lógica de Categorias Dinâmicas
const categorias = isReceita 
    ? ['Serviços', 'Produtos', 'Consultoria', 'Outros']
    : ['Fornecedores', 'Contas e Fixos', 'Impostos (DAS)', 'Marketing', 'Material', 'Outros'];

return (
    // Fundo Escuro com Desfoque (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    
      {/* Caixa Branca/Escura do Modal */}
    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {titulo}
        </h3>
        <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
            <X size={20} />
        </button>
        </div>

        {/* Corpo do Modal (O Formulário) */}
        <div className="p-6 flex flex-col gap-5">
        
          {/* Campo: Descrição */}
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Descrição</label>
            <input 
            type="text" 
            placeholder="Ex: Criação de Identidade Visual"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Campo: Valor */}
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Valor (R$)</label>
            <input 
                type="text" 
                placeholder="0,00"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
            />
            </div>
            
            {/* Campo: Data */}
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Data</label>
            <input 
                type="date" 
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
            />
            </div>
        </div>

          {/* Campo: Categoria */}
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoria</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all appearance-none">
            <option value="" disabled selected>Selecione uma categoria...</option>
            {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>
        </div>

        </div>

        {/* Rodapé do Modal (Botões) */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
        <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
            Cancelar
        </button>
        <button className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm transition-all ${corBotao}`}>
            Salvar Lançamento
        </button>
        </div>

    </div>
    </div>
);
}