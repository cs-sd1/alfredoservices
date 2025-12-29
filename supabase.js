// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Configurações do Supabase
const SUPABASE_URL = "https://hkzxabsswqftumqsfxgl.supabase.co"; // sua URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenhhYnNzd3FmdHVtcXNmeGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMDIzNTYsImV4cCI6MjA4MjU3ODM1Nn0.HzFcCoWKOTmeytGvceYJzXziqyWn4YBE9HtFUh98tRU"; // sua chave anônima

// Cria o cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função auxiliar para pegar URL pública de arquivo no bucket
export async function getPublicUrl(bucketName, path) {
  const { data, error } = supabase.storage.from(bucketName).getPublicUrl(path);
  if (error) {
    console.error("Erro ao obter URL pública:", error.message);
    return null;
  }
  return data.publicUrl;
}