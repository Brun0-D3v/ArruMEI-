import { supabase } from './supabase';

// 1. Função para registar um novo utilizador
export const registarUtilizador = async (email, password, nome) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Após criar a conta segura, guardamos o perfil na nossa tabela 'usuarios'
  if (data.user) {
    const { error: profileError } = await supabase
      .from('usuarios')
      .insert([
        { 
          id: data.user.id, 
          email: email,
          nome: nome 
        }
      ]);
      
    if (profileError) throw profileError;
  }

  return data;
};

// 2. Função para iniciar sessão
export const iniciarSessao = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// 3. Função para terminar sessão
export const terminarSessao = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// 4. Função para verificar quem está logado atualmente
export const obterSessaoAtual = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};