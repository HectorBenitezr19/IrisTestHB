This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Instrucciones en español
1. El usuario debe crear una cuenta nueva solamente con ingresar un mail y una clave de libre elección.
2. Los datos de registro servirán para el Login ya que estos datos quedan almacenados en la base de datos MongoDB.
3. Se pueden llenar tareas en cualquier fecha y estos registros quedaran guardados para futura consulta
4. La edición se dejó para borrar las tareas que el usuario quiera, por tiempo no pude poner el update para modificar la tarea a elección ni agregar locales para tener varios idiomas con su botón de traducción

La prueba se desarrolló con Next.js usando React en el front-end con Tailwind para los estilos CSS, no he trabajado con Angular pero me comprometo a estudiarlo. En el backend se creo un Cluster gratuito con una base de datos en MongoDB y la URI de conexión se dejó en una variable de entorno, para las API se crearon las de Login, Registro y envío de tareas registradas en la To Do List a la base de datos.
