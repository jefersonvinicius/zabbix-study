const app = require('./src/app');
const database = require('./src/database');

async function bootstrap() {
  await database.startDatabase();
  app.listen(3333, () => {
    console.log('Serving at http://localhost:3333');
  });
}

bootstrap();
