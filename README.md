# GoBarber API

GoBarber is the final project developed during the GoStack Bootcamp ([Rocketseat](https://rocketseat.com.br/) :rocket:). It is a barber shop application that allows barbers (providers) to inform their schedule availability and users to choose the provider and schedule their appointments.

The back-end project (API) provides everything needed to organize the appointments. Customers can choose their appointments' date and hour and providers can see set their schedule, choosing their available hours and check their dashboard to see their next appointments.

<i>To see the front-end project, click [here](https://github.com/biagavirete/gobarber_frontend).<br>
To see the mobile client, click [here](https://github.com/biagavirete/gobarber_mobile).</i>

## Getting started

**Installing**
> Cloning the repository

```bash
$ git clone https://github.com/biagavirete/gobarber_backend.git
$ cd gobarber_backend
```

**Running**
> Installing dependencies

```bash
$ yarn
```

> Setting .env - make a copy of .env.example to .env and set with your environment variables.

```bash
$ cp .env.example .env
```

> Create PostgreSQL instance using Docker

```bash
$ docker run --name gobarber-postgres -e POSTGRES_USER=docker -e POSTGRES_DB=gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

> Create MongoDB instance using Docker

```bash
$ docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo
```

> Create Redis instance using Docker

```bash
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
```

> Run the migrations

```bash
$ yarn typeorm migration:run
```

> Run the API

```bash
$ yarn dev:server
```

## Built with

* Typescript
* Node.js
* Express
* Multer
* TypeORM
* JWT-Token
* uuid-v4
* Date-FNS
* Jest
