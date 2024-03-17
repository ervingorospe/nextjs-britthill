/* eslint-disable @next/next/no-sync-scripts */
import './globals.css'
import _ from 'lodash'
import Script from 'next/script'
import { Header, Footer } from '@/components/layouts'
// function
import { getSettings } from '@/function/page'
import { getScriptUrl } from '@/function/embed-codes'
import { checkIfDisabled } from '@/function/disabled-script'

export const metadata = {
  title: 'Britt Hill Interiors - Full-Service Nationwide Interior Design Firm',
  description: 'Britt Hill Interiors - Full-Service Nationwide Interior Design Firm',
}

export const dynamicParams = false

export default async function RootLayout({ children }) {
  const settings = _.first(await getSettings())

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="isWJwY6SYSnYSZU3wliJVLlqqghbrNXreFiUv7vqWZU" />
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="website"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="theme-color" content="#ffffff"></meta>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <script type="text/javascript" src={getScriptUrl(_.get(settings, 'fields.headScripts'))}/>
        <script type="text/javascript" src={`https://www.googletagmanager.com/gtag/js?id=${_.get(settings, 'fields.googleTagManagerId')}`}/>
        <script src="https://cdn.jsdelivr.net/gh/modiphy/disabled@latest/dist/index.js"></script>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `${_.get(settings, 'fields.headScripts')}`,
          }}
        />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${_.get(settings, 'fields.googleTagManagerId')}`}
        />

        <Script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${_.get(settings, 'fields.googleTagManagerId')}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      
      <body className="xl:flex antialiased">
        <Header/>

        <main className="xl:flex xl:flex-grow">
          <div className="mx-auto w-full max-w-[1800px]">
            {children}

            <Footer/>
          </div>
        </main>
      </body>
    </html>
  )
}

/*
text-gray-300 
*/
