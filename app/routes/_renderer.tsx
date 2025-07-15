import { css, Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="description" content="Rinconcito Verde - Tu tienda de macetas, semillas y productos de hidroponia." />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/img/favicon.webp" />
        <link rel="preload" href="/app/style.css" as="style" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
        <title>Rinconcito Verde</title>
        <Style>{css`
          @font-face {
            font-family: 'Quicksand';
            src: url('/fonts/Quicksand-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Quicksand';
            src: url('/fonts/Quicksand-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          body, html {
            margin: 0;
            padding: 0;
            font-family: Quicksand;
            font-size: large;
          }

          body {
            margin: 0;
            padding: 0;
            background-image: url('/img/bg.webp');
            background-color: #a7b67f; 
            background-size: cover; 
            background-position: top center;
            background-repeat: no-repeat; 
            min-height: 100vh; 
            display: flex;
            justify-content: center;
            align-items: start;
          }
          p, h1, h2, h3, span{
            cursor: default;
          }
          button{
            cursor: pointer;
          }
          @view-transition {
            navigation: auto;
            duration: 0.2s;
            easing: ease-in-out;
          }
        `}</Style>
        
      </head>
      <body>
        {children}
      </body>

    </html>
  )
})
