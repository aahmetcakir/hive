import Layout from '@/components/Layout'
import AuthLayout from '@/components/AuthLayout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()

  const removedPathFromLayout = ['/login', '/register', '/reset-password']
  const isRemovedPath = removedPathFromLayout.includes(router.pathname)

  if (isRemovedPath) {
    return (
      <SessionProvider session={session}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </SessionProvider>
    )
  } else {
    return (
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout >
      </SessionProvider>
    )
  }
}
