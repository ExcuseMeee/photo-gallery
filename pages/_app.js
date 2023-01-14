import Layout from '../components/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import { ModalContextProvider } from '../context/ModalContext'
import { FirestoreContextProvider } from '../context/FirestoreContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  return(
    <AuthContextProvider>
      <FirestoreContextProvider>
        <ModalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>

  ) 
}
