import 'dotenv/config';

import { connectToDatabase } from './database';
import { app } from './app';

const { PORT = 3000 } = process.env;

connectToDatabase()
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server is listening on port ${PORT}`))
  .catch(console.error);
