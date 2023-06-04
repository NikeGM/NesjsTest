# NestJS BookStore Sample

This project serves as an example of a simple service - a book store - built with NestJS and TypeORM.

## Description

This book store service is designed as a straightforward application to demonstrate the capabilities of NestJS and TypeORM. The application allows users to interact with the store in a variety of ways, including browsing books, purchasing books, and managing user profiles.

Built on top of NestJS, the project utilizes the framework's robustness and flexibility to efficiently handle different types of requests and manage various services. TypeORM, a powerful ORM tool for TypeScript and JavaScript, is used for data management, allowing convenient and efficient operations on the database.

## Prerequisites

- Docker and Docker Compose are installed on your system.
- Node.js and npm are installed on your system.

## Setup

1. **Set Environment Variables**: Copy the `.env-example` file and rename it to `.env`. Update the variables in the `.env` file with your specific values.

2. **Start the Database**: Run the following command to start your database using Docker:

    ```bash
    docker-compose up -d
    ```

3. **Run Migrations**: Use the following command to run the database migrations:

    ```bash
    npx typeorm-ts-node-esm migration:run -d ./data-source.ts
    ```

## Running the Project

Once you've completed the setup, you can start the service with the following command:

```bash
npm run start
```

Now your book store service should be up and running!