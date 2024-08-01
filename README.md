# YAARG (Yet Another AI Resume Generator)

[![Loom Thumbnail](thumbnails/LoomThumbnail.png)](https://www.loom.com/share/ed4a854ec2c7408dae87f993b57b9779)

Generates resumes customized for individual roles with AI suggestions.

Built using [React](https://react.dev/), [NextJS](https://nextjs.org/), [AuthJS](https://authjs.dev/), [Prisma ORM](https://www.prisma.io/), [Tailwind CSS](https://tailwindcss.com/), [PostgreSQL](https://www.postgresql.org/), and the [ChatGPT API](https://platform.openai.com/docs/api-reference/introduction)

Demo site: https://yaarg.vercel.app/

## Local Development

### Environment File

Copy [.env.example](.env.example) to `.env`, modify as needed.

### Postgresql

```
docker pull postgres
docker run --name yaarg-postgresql -e POSTGRES_PASSWORD=yaarg -e POSTGRES_USER=yaarg -p 5432:5432 -d postgres 
npx prisma migrate dev
```

### Dev Server

After creating a .env file and database, run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser

### C4 Diagrams

<img alt="YAARG System Context Diagram" src="structurizr/exports/structurizr-1-SystemContext-001.png" width="250" />

<img alt="YAARG Container Diagram" src="structurizr/exports/structurizr-1-Container-001.png" width="400" />

<img alt="YAARG Component Diagram" src="structurizr/exports/structurizr-1-Component-001.png" width="500" />

To start the Structurizr server, run these commands:
```
docker pull structurizr/lite
docker run -it --rm -p 8080:8080 -v $(pwd)/structurizr:/usr/local/structurizr structurizr/lite
```

Then view at http://localhost:8080

### Known Issues

*   Resend authenticator throws an error in middleware, issue is described [here](https://github.com/nextauthjs/next-auth/issues/10632)
