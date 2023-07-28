import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AlertContextComponent } from '../src/contexts/alertContext'
import { useState } from 'react'
import { HeaderMenu } from '../src/layout/HeaderMenu'

config.autoAddCss = false

export interface PageProps {
  setTitle: (title: string) => void
  setShowBackButton: (show: boolean) => void
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [title, setTitle] = useState<string>('Gestor escolar')
  const [showBackButton, setShowBackButton] = useState<boolean>(false)
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
          <HeaderMenu showBackButton={showBackButton} title={title} />
        )}
        <Component
          setTitle={setTitle}
          setShowBackButton={setShowBackButton}
          {...pageProps}
        />
      </main>
    </AlertContextComponent>
  )
}
