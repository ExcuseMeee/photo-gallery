import Layout from '../components/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import { ModalContextProvider } from '../context/ModalContext'
import { FirestoreContextProvider } from '../context/FirestoreContext'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {

  return(
    <AuthContextProvider>
      <FirestoreContextProvider>
        <ModalContextProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </ModalContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>

  ) 
}
