const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = `export const environment = {
  production: ${process.env.PRODUCTION || false},
  apiKey: '${process.env.API_KEY}',
  databaseUrl: '${process.env.DATABASE_URL}'
};`;

fs.writeFileSync('./src/environments/environment.secret.ts', envConfig);