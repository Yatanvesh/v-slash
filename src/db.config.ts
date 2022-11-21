import { TypeOrmModule } from '@nestjs/typeorm'

export const DB_CONFIG = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '1234',
  database: process.env.DATABASE_NAME || 'vslash',
  autoLoadEntities: true,
  entities: [],
  // Changes the schema whenever entity files are modified, useful in development environment
  synchronize: true,
})
