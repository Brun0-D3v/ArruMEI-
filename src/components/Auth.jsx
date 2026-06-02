import { useState } from 'react';
import { Zap, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
// Importamos as funções reais do nosso banco de dados!
import { iniciarSessao, registarUtilizador } from '../services/auth'; 

export function Auth({ onLogin }) {
  const [view, setView] = useState('login');
  
  // Novos estados para guardar o que o usuário digita e os avisos do sistema
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // Nossa nova função de envio conectada ao Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa erros anteriores

    if(view === 'forgot') {
      alert("Link de recuperação enviado para o seu e-mail!");
      setView('login');
      return;
    }

    setLoading(true);

    try {
      if (view === 'register') {
        // Envia para o Supabase criar a conta
        await registarUtilizador(email, password, nome);
        // Se der certo, já faz o login automático
        await iniciarSessao(email, password);
      } else {
        // Apenas faz o login
        await iniciarSessao(email, password);
      }
      
      // Chama a função do App.jsx para liberar o Dashboard!
      onLogin('dashboard');
      
    } catch (error) {
      // Se a senha for fraca ou o email estiver errado, mostramos o erro
      setErro(error.message || 'Ocorreu um erro ao processar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      
      {/* Lado Esquerdo: Branding (Mantido intacto) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-arrumei-purple text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-900 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide">ArruMEI</h1>
            <p className="text-xs text-white/60 font-semibold uppercase tracking-widest">Gestão Simplificada</p>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-black mb-6 leading-tight">
            Assuma o controle do seu negócio hoje.
          </h2>
          <p className="text-lg text-white/80">
            A plataforma definitiva para o Microempreendedor Individual organizar finanças, agenda e impostos em um só lugar.
          </p>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          &copy; {new Date().getFullYear()} ArruMEI. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito: Formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Logo Mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-arrumei-purple text-white rounded-xl flex items-center justify-center">
              <Zap size={20} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">ArruMEI</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {view === 'login' && 'Bem-vindo de volta'}
              {view === 'register' && 'Crie sua conta'}
              {view === 'forgot' && 'Recuperar senha'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {view === 'login' && 'Insira suas credenciais para acessar seu painel'}
              {view === 'register' && 'Preencha os dados abaixo para começar a usar'}
              {view === 'forgot' && 'Digite seu e-mail e enviamos as instruções para redefinir sua senha.'}
            </p>
          </div>

          {/* CAIXA DE ERRO: Aparece se o login falhar */}
          {erro && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Campo Nome (Apenas no Cadastro) */}
            {view === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Campo E-mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                />
              </div>
            </div>

            {/* Campo Senha */}
            {view !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                {view === 'login' && (
                  <button
                  type='button'
                  onClick={() => setView('forgot')}
                  className='text-xs font-semibold text-arrumei-purple hover:text-arrumei-purple-light transition-colors'
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-arrumei-purple/50 transition-all"
                />
              </div>
            </div>
            )}
            
            {/* Botão de Ação */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-arrumei-purple hover:bg-arrumei-purple-light text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Aguarde...' : (
                <>
                  {view === 'login' && 'Entrar na plataforma'}
                  {view === 'register' && 'Criar minha conta'}
                  {view === 'forgot' && 'Enviar link de recuperação'}
                  {view !== 'forgot' && <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />}
                </>
              )}
            </button>
          </form>

          {/* Botão de Alternância Login/Cadastro */}
          <div className="mt-8 text-center">
            {view === 'forgot' ? (
              <button
              onClick={() => { setView('login'); setErro(''); }}
              className='flex items-center justify-center gap-2 w-full text-sm font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors'
              >
                <ArrowLeft size={16} /> Voltar para o login
              </button>
            ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {view === 'login' ? "Ainda não tem uma conta? " : "Já possui uma conta? "}
              <button 
                onClick={() => { setView(view === 'login' ? 'register' : 'login'); setErro(''); }}
                className="font-bold text-arrumei-purple hover:text-arrumei-purple-light transition-colors"
              >
                {view === 'login' ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}