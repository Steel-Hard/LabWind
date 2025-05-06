// testConnection.ts
import db from './db';

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Conexão MySQL bem-sucedida!');
    connection.release();
  } catch (error: any) {
    console.error('Erro ao conectar no MySQL:', error.message || error);
  }
}

testConnection();
