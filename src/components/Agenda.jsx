import { useState } from "react";
import { Calendar, Clock, MapPin, Edit2, Trash2, Plus } from "lucide-react";
import { ModalCompromisso } from "./ModalCompromisso";

const compromissosMock = [
    {
       data: "HOJE, 19 DE MAIO",
    itens: [
      { id: 1, horario: "10:00", titulo: "Reunião com Fornecedor (Gráfica)", local: "Google Meet", tipo: "reuniao" },
      { id: 2, horario: "14:30", titulo: "Entrega de Encomenda", local: "Centro da Cidade", tipo: "entrega" }
    ]
  },
  {
    data: "AMANHÃ, 20 DE MAIO",
    itens: [
      { id: 3, horario: "09:00", titulo: "Renovação do Certificado Digital", local: "Cartório", tipo: "burocracia" },
      { id: 4, horario: "16:00", titulo: "Call de Alinhamento - Projeto Novo", local: "Google Meet", tipo: "reuniao" }
    ] 
    }
];

export function Agenda() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-10">
      
      {/* Cabeçalho da Agenda (CTAs) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agenda</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gerencie seus compromissos e reuniões.</p>
        </div>
        
        <button
         onClick={() => setIsModalOpen(true)}
         className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-arrumei-purple hover:bg-arrumei-purple-light dark:bg-arrumei-purple dark:hover:bg-arrumei-purple-light text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
          <Plus size={18} />
          Novo compromisso
        </button>
      </div>

      {/* Corpo da Agenda: Lista de Compromissos */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-800/20">
          <Calendar className="text-arrumei-purple" size={20} />
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Próximos Dias</h3>
        </div>

        <div>
          {compromissosMock.map((grupo, index) => (
            <div key={index}>
              {/* Cabeçalho da Data */}
              <div className="px-6 py-3 bg-gray-50/80 dark:bg-gray-800/40 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                {grupo.data}
              </div>

              {/* Lista de itens do dia */}
              <div className="flex flex-col">
                {grupo.itens.map((item) => (
                  <div key={item.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group gap-4">
                    
                    {/* Horário e Informações */}
                    <div className="flex items-start sm:items-center gap-4 md:gap-6">
                      <div className="text-lg font-bold text-arrumei-purple dark:text-arrumei-purple-light w-16 shrink-0">
                        {item.horario}
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {item.titulo}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={14} />
                          <span>{item.local}</span>
                        </div>
                      </div>
                    </div>

                    {/* Botões de Ação (Editar/Excluir) - Aparecem no Hover */}
                    <div className="flex items-center gap-2 self-end sm:self-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-2 text-gray-400 hover:text-arrumei-purple bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
      <ModalCompromisso
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    </div>
  );
}