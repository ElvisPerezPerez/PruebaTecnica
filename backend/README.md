# Backend - Prueba Técnica

Este es el backend de la prueba técnica, desarrollado con NestJS y Prisma.

## Requisitos

- Node.js >= 18
- pnpm (o npm/yarn)
- PostgreSQL (o una base de datos compatible)
## Instalación

1. Clona el repositorio y entra a la carpeta del backend:

   ```sh
   cd backend
   ```

### Configuración de la base de datos

2. Crea una base de datos PostgreSQL y obtén la URL de conexión, abre el archivo `backend/.env` y copia la url en la variable  `DATABASE_URL` con tu cadena de conexión:

   ```env
   DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_db"
   ```

  

3. Instala las dependencias:

   ```sh
   pnpm install
   ```
  
4. Compilar a javascript y generar los schemas de prisma:

   ```sh
   pnpm run build
   ```

5. Generar y aplicar migraciones para la creación de las tablas en la base de datos:

   ```sh
   pnpm prisma migrate dev --name init
   ```

6. Correr script para generar datos de prueba de Usuarios, tarjetas y pagos:

   ```sh
   pnpm db:seed
   ```


En el caso de que se quiera resetear la base de datos:

   ```sh
   pnpm db:reset
   ```



## Uso en desarrollo


Para iniciar el servidor en modo desarrollo:

```sh
pnpm start:dev
```

Para iniciar el servidor en modo producción:

```sh
pnpm start:dev
```

 El servidor estará disponible en `http://localhost:3000` por defecto.

___

