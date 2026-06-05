import bcrypt from 'bcrypt';

const password = process.argv[2];

if (!password) {
  console.error('\n❌ Erro: Por favor, forneça uma senha.');
  console.error('Exemplo de uso: npx tsx generate-hash.ts "sua_senha_secreta"\n');
  process.exit(1);
}

async function generate() {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n✅ --- HASH GERADO COM SUCESSO ---\n');
    console.log(hash);
    console.log('\n----------------------------------\n');
    console.log('Copia o hash gerado acima e coloque na variável ADMIN_PASSWORD_HASH');
    console.log('no seu arquivo .env ou no painel do Render.\n');
  } catch (error) {
    console.error('Erro ao gerar o hash:', error);
  }
}

generate();
