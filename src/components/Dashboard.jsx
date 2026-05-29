import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  CheckSquare,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ChevronRight,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

// Importando os modais que criamos anteriormente
import { ModalCompromisso } from './ModalCompromisso';
import { ModalLancamento } from './ModalLancamento'; // Ajuste o nome caso tenha salvo diferente

/* ─── Dados Mockados ─── */
const chartData = [
  { mes: "Out", entradas: 3200, saidas: 1800 },
  { mes: "Nov", entradas: 4100, saidas: 2200 },
  { mes: "Dez", entradas: 3800, saidas: 1600 },
  { mes: "Jan", entradas: 5200, saidas: 2900 },
  { mes: "Fev", entradas: 4600, saidas: 2100 },
  { mes: "Mar", entradas: 5100, saidas: 1855.9 },
];

const transacoes = [
  { id: 1, descricao: "Serviço de design - Maria Silva", valor: 1200, tipo: "entrada", categoria: "Serviços", data: "2026-03-18" },
  { id: 2, descricao: "Consultoria João Ferreira", valor: 800, tipo: "entrada", categoria: "Consultoria", data: "2026-03-17" },
  { id: 3, descricao: "Assinatura Adobe CC", valor: 350, tipo: "saida", categoria: "Software", data: "2026-03-16" },
  { id: 4, descricao: "Projeto identidade visual", valor: 3100, tipo: "entrada", categoria: "Serviços", data: "2026-03-15" },
  { id: 5, descricao: "Material de escritório", valor: 150, tipo: "saida", categoria: "Material", data: "2026-03-14" },
  { id: 6, descricao: "DAS MEI - Março", valor: 75.6, tipo: "saida", categoria: "Impostos", data: "2026-03-13" },
];

const compromissos = [
  { id: 1, titulo: "Reunião com Maria Silva", data: "2026-03-21", hora: "09:00", tipo: "reuniao" },
  { id: 2, titulo: "Entrega do projeto João", data: "2026-03-21", hora: "14:00", tipo: "entrega" },
  { id: 3, titulo: "Consulta Fernanda Costa", data: "2026-03-22", hora: "10:30", tipo: "atendimento" },
  { id: 4, titulo: "Reunião online Ana Paula", data: "2026-03-22", hora: "15:00", tipo: "reuniao" },
];

const totalEntradas = transacoes.filter((t) => t.tipo === "entrada").reduce((a, t) => a + t.valor, 0);
const totalSaidas = transacoes.filter((t) => t.tipo === "saida").reduce((a, t) => a + t.valor, 0);
const saldo = totalEntradas - totalSaidas;

const tipoColor = {
  reuniao: "bg-purple-500",
  atendimento: "bg-cyan-500",
  entrega: "bg-emerald-500",
  outro: "bg-gray-500",
};

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date("2026-03-21");
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

const fmt = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── Mini Componentes ─── */
function Eyebrow({ children }) {
  return <p className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 tracking-widest uppercase">{children}</p>;
}

function SectionTitle({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[13.5px] font-semibold text-gray-900 dark:text-white tracking-tight">{title}</h3>
      {action}
    </div>
  );
}

/* ─── Página Principal ─── */
export function Dashboard({ setTelaAtiva }) {
  // ESTADOS PARA OS MODAIS DE AÇÃO RÁPIDA
  const [isModalCompromissoOpen, setIsModalCompromissoOpen] = useState(false);
  const [isModalReceitaOpen, setIsModalReceitaOpen] = useState(false);
  const [isModalDespesaOpen, setIsModalDespesaOpen] = useState(false);

  const ratio = totalSaidas / totalEntradas;
  const saude =
    ratio < 0.4
      ? { label: "Saudável", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", bar: "bg-emerald-500" }
      : ratio < 0.7
      ? { label: "Atenção", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", bar: "bg-amber-500" }
      : { label: "Risco", color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10", bar: "bg-red-500" };

  return (
    <div className="max-w-[1240px] mx-auto space-y-5 pb-10">
      
      {/* ── Cabeçalho da Página ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-1 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
            Bom dia, Bruno
          </h1>
          <p className="mt-1.5 text-[13.5px] text-gray-500 dark:text-gray-400">
            Aqui está um resumo rápido do seu negócio hoje.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Agora abrem os modais diretamente */}
          <button
            onClick={() => setIsModalCompromissoOpen(true)}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-[13px] font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <Calendar size={14} /> Novo compromisso
          </button>
          <button
            onClick={() => setIsModalReceitaOpen(true)}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-gradient-to-br from-arrumei-purple to-purple-600 text-white text-[13px] font-medium shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
          >
            <Plus size={14} /> Novo lançamento
          </button>
        </div>
      </div>

      {/* ── Linha de KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Saldo Principal */}
        <div className="relative overflow-hidden rounded-[14px] p-5 shadow-lg border border-white/5 bg-gradient-to-br from-[#2A1547] via-[#3B1E5D] to-[#4A2873]">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#9B6FD4]/20 blur-[8px]" />
          <div className="relative z-10 flex items-center justify-between mb-3">
            <p className="text-[10.5px] font-semibold text-white/50 tracking-widest uppercase">Saldo atual</p>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10">
              <Wallet size={13} className="text-white/85" />
            </div>
          </div>
          <p className="relative z-10 text-[28px] font-semibold text-white tracking-tight leading-none tabular-nums">
            R$ {fmt(saldo)}
          </p>
          <div className="mt-3 relative z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10.5px] text-white/85">
            <TrendingUp size={10} /> +12% vs mês anterior
          </div>
        </div>

        <KpiCard
          label="Entradas"
          value={`R$ ${fmt(totalEntradas)}`}
          sub={`${transacoes.filter((t) => t.tipo === "entrada").length} lançamentos em março`}
          icon={<ArrowUpRight size={14} />}
          tone="success"
          delta="+8.2%"
        />

        <KpiCard
          label="Saídas"
          value={`R$ ${fmt(totalSaidas)}`}
          sub={`${transacoes.filter((t) => t.tipo === "saida").length} lançamentos em março`}
          icon={<ArrowDownRight size={14} />}
          tone="error"
          delta="-3.1%"
        />

        {/* Saúde Financeira */}
        <div className="bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <Eyebrow>Saúde</Eyebrow>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${saude.bg}`}>
              <Activity size={13} className={saude.color} />
            </div>
          </div>
          <p className={`text-[22px] font-semibold tracking-tight leading-tight ${saude.color}`}>
            {saude.label}
          </p>
          <div className="mt-3 w-full rounded-full overflow-hidden h-1 bg-gray-100 dark:bg-gray-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${saude.bar}`}
              style={{ width: `${Math.max(8, 100 - ratio * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
            {(ratio * 100).toFixed(0)}% das entradas em saídas
          </p>
        </div>
      </div>

      {/* ── Gráfico e Compromissos ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Gráfico corrigido com altura travada e w-full */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
            <div>
              <SectionTitle title="Evolução financeira" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400">Entradas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400">Saídas</span>
              </div>
            </div>
          </div>
          
          {/* CORREÇÃO DO GRÁFICO: Div com altura fixa garantida */}
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gEnt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gSai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} dy={6} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '8px 12px', fontSize: '12px' }}
                  labelStyle={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}
                  formatter={(v) => [`R$ ${fmt(v)}`]}
                  cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} fill="url(#gEnt)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#10b981' }} />
                <Area type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={1.5} fill="url(#gSai)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#ef4444' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Próximos Compromissos */}
        <div className="bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <SectionTitle
            title="Próximos compromissos"
            action={
              <button onClick={() => setTelaAtiva && setTelaAtiva('agenda')} className="flex items-center text-[11.5px] font-medium text-gray-500 dark:text-gray-400 hover:text-arrumei-purple dark:hover:text-arrumei-purple-light transition-colors">
                Ver todos <ChevronRight size={12} />
              </button>
            }
          />
          <div className="space-y-1.5">
            {compromissos.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-2.5 rounded-[10px] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                <div className={`rounded-full flex-shrink-0 mt-1 w-[3px] min-h-[32px] ${tipoColor[c.tipo]}`} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-gray-900 dark:text-white group-hover:text-arrumei-purple dark:group-hover:text-arrumei-purple-light transition-colors">
                    {c.titulo}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock size={10} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {formatDate(c.data)} · {c.hora}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Atalhos Rápidos e Últimas Movimentações ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Atalhos (Agora chamando os Modais) */}
        <div className="bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={13} className="text-arrumei-purple" />
            <h3 className="text-[13.5px] font-semibold text-gray-900 dark:text-white tracking-tight">Ações rápidas</h3>
          </div>
          <div className="space-y-1.5">
            <QuickAction onClick={() => setIsModalReceitaOpen(true)} tone="success" icon={<TrendingUp size={14} />} label="Adicionar receita" sub="Registrar uma entrada" />
            <QuickAction onClick={() => setIsModalDespesaOpen(true)} tone="error" icon={<TrendingDown size={14} />} label="Adicionar despesa" sub="Registrar uma saída" />
            <QuickAction onClick={() => setIsModalCompromissoOpen(true)} tone="brand" icon={<Calendar size={14} />} label="Novo compromisso" sub="Agendar um evento" />
            <QuickAction onClick={() => setTelaAtiva && setTelaAtiva('tarefas')} tone="neutral" icon={<CheckSquare size={14} />} label="Ver tarefas" sub="Sua lista do dia" />
          </div>
        </div>

        {/* Últimas Movimentações */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <SectionTitle
            title="Últimas movimentações"
            action={
              <button onClick={() => setTelaAtiva && setTelaAtiva('financeiro')} className="flex items-center text-[11.5px] font-medium text-arrumei-purple hover:text-arrumei-purple-light transition-colors">
                Ver todas <ChevronRight size={12} />
              </button>
            }
          />
          <div>
            {transacoes.slice(0, 6).map((t, idx) => (
              <div key={t.id} className={`flex items-center gap-3 px-2 py-2.5 rounded-[10px] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${idx !== 0 ? 'border-t border-gray-100 dark:border-gray-800/50' : ''}`}>
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${t.tipo === "entrada" ? "bg-emerald-50 dark:bg-emerald-500/10" : "bg-red-50 dark:bg-red-500/10"}`}>
                  {t.tipo === "entrada" ? <ArrowUpRight size={15} className="text-emerald-500" /> : <ArrowDownRight size={15} className="text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-gray-900 dark:text-white">{t.descricao}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    {new Date(t.data + "T00:00:00").toLocaleDateString("pt-BR")} · {t.categoria}
                  </p>
                </div>
                <span className={`text-[13px] font-semibold flex-shrink-0 tabular-nums ${t.tipo === "entrada" ? "text-emerald-500" : "text-red-500"}`}>
                  {t.tipo === "entrada" ? "+" : "−"} R$ {fmt(t.valor)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RENDERIZANDO OS MODAIS ── */}
      <ModalCompromisso isOpen={isModalCompromissoOpen} onClose={() => setIsModalCompromissoOpen(false)} />
      
      {/* Caso seu ModalLancamento precise receber um prop indicando o tipo (entrada/saida), você pode ajustar aqui */}
      <ModalLancamento isOpen={isModalReceitaOpen} onClose={() => setIsModalReceitaOpen(false)} tipo="entrada" />
      <ModalLancamento isOpen={isModalDespesaOpen} onClose={() => setIsModalDespesaOpen(false)} tipo="saida" />

    </div>
  );
}

/* ─── Sub-componentes ─── */
function KpiCard({ label, value, sub, icon, tone, delta }) {
  const isSuccess = tone === "success";
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[14px] border border-gray-100 dark:border-gray-800 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <Eyebrow>{label}</Eyebrow>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSuccess ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-500'}`}>
          {icon}
        </div>
      </div>
      <p className="text-[22px] font-semibold text-gray-900 dark:text-white tracking-tight leading-tight tabular-nums">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold ${isSuccess ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-500'}`}>
          {delta}
        </span>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">{sub}</span>
      </div>
    </div>
  );
}

function QuickAction({ onClick, tone, icon, label, sub }) {
  const getStyle = () => {
    switch (tone) {
      case "success": return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500";
      case "error": return "bg-red-50 dark:bg-red-500/10 text-red-500";
      case "brand": return "bg-arrumei-purple/10 text-arrumei-purple";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-2.5 rounded-[10px] text-left transition-all bg-transparent border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700"
    >
      <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0 ${getStyle()}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[12.5px] font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-[10.5px] text-gray-500 dark:text-gray-400">{sub}</p>
      </div>
    </button>
  );
}