import { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, AlignLeft, Link as LinkIcon, Navigation } from "lucide-react";

export function ModalCompromisso ({ isOpen, onClose }) {
    // Estado para controlar se é endereço físico ou link online
    const [tipoLocal, setTipoLocal] = useState('presencial'); // 'presencial' | 'online'

    // Não renderiza se o modal não estiver aberto
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">

            {/* Caixa do modal */}
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <CalendarIcon size={20} className="text-arrumei-purple" />
                        Novo Compromisso
                    </h3>
                    <button 
                    onClick={onClose}
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Corpo do Forms */}
                <div className="p-6 flex flex-col gap-5">
                    
                    {/* Titulo do Compromisso */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> Título </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <AlignLeft size={18} />
                            </div>
                            <input 
                                type="text"
                                placeholder="Ex: Reunião com Cliente"
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all" 
                                />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Data */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Data</label>
                            <input 
                            type="date"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                             />
                        </div>
                        {/* Horário */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Horário</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Clock size={18} />
                                </div>
                                <input 
                                type="time"
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Localização Inteligente (Toggle + Input Dinâmico) */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Localização</label>
                            
                            {/* Toggle Buttons */}
                            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setTipoLocal('presencial')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                        tipoLocal === 'presencial' 
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    <MapPin size={14} /> Presencial
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTipoLocal('online')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                        tipoLocal === 'online' 
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    <LinkIcon size={14} /> Online
                                </button>
                            </div>
                        </div>

                        {/* Input Dinâmico de Localização */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                {tipoLocal === 'presencial' ? <Navigation size={18} /> : <LinkIcon size={18} />}
                            </div>
                            <input 
                            type={tipoLocal === 'online' ? 'url' : 'text'}
                            placeholder={tipoLocal === 'presencial' ? "Ex: Rua da Aurora, 123 - Centro" : "Ex: https://meet.google.com/..."}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all" 
                            />
                        </div>
                    </div>

                    {/* Categoria / Tipo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de Compromisso</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all appearance-none">
                            <option value="" disabled selected>Selecione...</option>
                            <option value="reuniao">Reunião</option>
                            <option value="entrega">Entrega / Serviço</option>
                            <option value="burocracia">Burocracia MEI</option>
                            <option value="pessoal">Pessoal</option>
                        </select>
                    </div>

                </div>

                {/* Rodapé e Botões */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-800/20">
                    <button
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-arrumei-purple hover:bg-arrumei-purple-light dark:bg-arrumei-purple dark:hover:bg-arrumei-purple-light rounded-xl shadow-sm transition-all">
                        Salvar Compromisso
                    </button>
                </div>

            </div>
        </div>
    );
}