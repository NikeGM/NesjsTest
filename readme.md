# NestJS BookStore Sample

The service demonstrates basic functionalities including user management, book creation and editing, book purchasing, role management, and authorization via JWT.

## Description

g
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