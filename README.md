# YAARG (Yet Another AI Resume Generator)

Uses Next.js and prisma

## Dev server

To run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser


## Postgresql setup for local dev

I will eventually do this with docker compose or kubernetes:

```
docker pull postgres
docker run --name yaarg-postgresql -e POSTGRES_PASSWORD=yaarg -e POSTGRES_USER=yaarg -p 5432:5432 -d postgres 
npx prisma migrate dev
```