# Kanban Board

## Requirements
1. Clone the repository
2. run the command npx prisma generate under express-backend to create a prisma client to connect to the DB
3. run the command '''npm -i''' under both express-backend and react-frontend
4. Open 2 new terminals one pointing at the react-frontend directory and other to the express-backend one.
5. Once we are in the directory, run npm run dev(for conitunous testing)
6. Click on the localhost link given by frontend terminal.

## Thoughts while making search
1. For searching we used Debouncing to reduce API calls
2. Used Prisma as an ORM for interacting with MySQL database