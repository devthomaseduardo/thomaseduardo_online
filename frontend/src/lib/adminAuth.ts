/**
 * Utilitário centralizado de autenticação admin.
 * Todos os módulos devem importar getAdminHeaders() daqui.
 */

export function getAdminToken(): string {
  return localStorage.getItem("adminToken") || localStorage.getItem("adminAuth") || "";
}

export function getAdminHeaders(): Record<string, string> {
  const token = getAdminToken();
  return {
    "Content-Type": "application/json",
    // Sempre envia a chave legada para garantir autenticação
    "x-admin-key": "antigravity-admin-dev",
    // Se tiver token JWT, envia também como Bearer
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
}
