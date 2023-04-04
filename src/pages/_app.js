import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const removedPathFromLayout = ['/login', '/register', '/reset-password']
  const isRemovedPath = removedPathFromLayout.includes(router.pathname)

  if (isRemovedPath) {
    return <Component {...pageProps} />
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}
