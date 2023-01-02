import Layout from '../components/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import { ModalContextProvider } from '../context/ModalContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {

  return(
    <AuthContextProvider>
      <ModalContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalContextProvider>
    </AuthContextProvider>

  ) 
}
