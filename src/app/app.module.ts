import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from '../book/book.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BookModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}
