import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/index';
import {PrismaPg} from '@prisma/adapter-pg';
import {Pool} from 'pg';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    if(!process.env.DATABASE_URL){
      throw new Error("Erro: DATABASE_URL não encontrado no arquivo .env")
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });
    const adapter = new PrismaPg(pool);
    super({adapter});
  }
    async onModuleInit() {
      await this.$connect();
  }
}