const body = {
  name: "Homma Desing",
  cnpj: "06.264.848/0005-38",
  email: "contato@empresa.com",
  phone: "+55 11 90000-0000",
  clientType: "new",
  password: "senha",
  obs: "Pelo serviço ora contratado..."
};
fetch("http://localhost:3001/api/v2/clients", {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-admin-key": "admin123" },
  body: JSON.stringify(body)
}).then(r => r.text()).then(console.log).catch(console.error);
