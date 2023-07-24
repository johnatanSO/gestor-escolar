import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AlertContextComponent } from '../src/contexts/alertContext'
import { useState } from 'react'

config.autoAddCss = false

export interface PageProps {
  setTitle: (title: string) => void
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [title, setTitle] = useState('Gestor escolar')
  const restrictLayout =
    router.route !== '/login' && router.route !== '/createAccount'

  return (
    <AlertContextComponent>
      <Head>
        <title>{title || 'Gestor escolar'}</title>
        <link rel="shortcut icon" href="./favicon.ico" />
      </Head>

      <main className={restrictLayout ? 'screensContainer' : 'loginContainer'}>
        {restrictLayout && (
          <header>
            <h2 className="titlePage">{title || 'Gestor escolar'}</h2>
            <button className="logoutButton" type="button">
              Sair
            </button>
          </header>
        )}
        <Component setTitle={setTitle} {...pageProps} />
      </main>
    </AlertContextComponent>
  )
}
