import * as fs from 'fs';
import { parse } from 'dotenv';

//En esta clase definimos nuestra configuración ya sea de desarrollo o de producción
//Tenemos que instalar 2 dependencias de desarrollo con el siguiente comando
//npm i -D dotenv @types/dotenv
//autoinyecta las variables de entorno que necesitemos en nuestra aplicacion (.env file) archivo que creamos

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file  does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
