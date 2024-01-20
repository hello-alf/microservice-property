## Descripción

Este proyecto esta creado en Nestjs, actualmente el microservicio de propiedades para NurBNB se enfoca en realizar la busqueda de propiedades previamente registradas

## Diagrama de clases

https://miro.com/app/board/uXjVM5vV3HA=/?moveToWidget=3458764561085745471&cot=10

## Video youtube

https://youtu.be/PzoVRmwHdvk

## Screenshots de Tests

![image](https://drive.google.com/uc?export=view&id=1iYnZFjV-va7S9iZzPs7pu-CT43JjW66f)

![image](https://drive.google.com/uc?export=view&id=1MNqVXDdhPqse629nz_RHlKGbuWl7Ol6u)

## Instalación

```bash
$ npm install
```

## Correr la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# integration tests
$ npm run test:integration
```

## Docker

```bash
# crear imagen
$ docker image build -t helloalf/microservice-booking .

# correr contenedor
$ docker container run -d --name micro -p 3009:3000 helloalf/microservice-booking

# publicar imagen
$ docker image push helloalf/microservice-booking


# Crear contexto
$ docker buildx create --use

# Crear imagen para amd y arm
$ docker buildx build --platform linux/amd64,linux/arm64 -t helloalf/test2 .

# Subir imagen multiarquitectura
$ docker buildx build --platform linux/amd64,linux/arm64 -t helloalf/test2 --push .
```
