# Task Management

## Description
This is a Task Management application similar to Kanbanchi and Trello. This application help organize tasks using boards, lists, and cards, allowing users to track their projects efficiently to be more consistent.

This is a Fullstack Application that utlizes: React, Next.js, Server Actions, Prisma, Tailwind, and MySQL

![Screenshot from 2024-04-08 13-36-37](https://github.com/dosawaru/task-management/assets/35234154/9c19d4f2-c022-4a74-bab0-3ca177c48415)
![Screenshot from 2024-04-08 13-50-12](https://github.com/dosawaru/task-management/assets/35234154/23a5e4b2-b79a-4c55-b0ab-db18e542ea42)
![Screenshot from 2024-04-08 14-07-38](https://github.com/dosawaru/task-management/assets/35234154/ee0b88be-85df-4235-be72-e012c123d8dc)
![Screenshot from 2024-04-08 14-05-39](https://github.com/dosawaru/task-management/assets/35234154/63870163-ea08-48e8-907d-b93ca0bcd174)

Try it here: https://task-management-ecru-seven.vercel.app/

## Key Features
- Authentication
- Organizations / Workspaces
- Board creation
- Board rename and delete functionalities
- List creation
- List rename, delete, and copy operations
- Card creation
- Card description, rename, delete, and copy functionalities
- MySQL Database integration
- Prisma ORM implementation
- shadcnUI & TailwindCSS implementation

## Installation

1. Install required packages:
    ```
    npm install
    ```

2. Set up environment variables in a `.env` file:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
    DATABASE_URL=
    ```

## Setup Prisma

1. Add MySQL Database

2. Generate Prisma client:
    ```
    npx prisma generate
    ```

3. Push the database schema to your MySQL database:
    ```
    npx prisma db push
    ```

## Usage

Start the application in development mode:
```
npm run dev
```
