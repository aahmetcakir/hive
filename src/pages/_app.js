import Layout from '@/components/Layout'
import AuthLayout from '@/components/AuthLayout'
import ErrorLayout from '@/components/ErrorLayout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'
import { Analytics } from '@vercel/analytics/react';
import ThemeProvider from "@/context/ThemeContext";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  Modal.setAppElement("#__next");

  const removedPathFromLayout = ['/login', '/register', '/reset-password']
  const landingPages = ['/',]
  const isRemovedPath = removedPathFromLayout.includes(router.pathname)
  const isErrorLayout = router.pathname.includes('/404', '/500')
  const isLandingPage = landingPages.includes(router.pathname)

  if (isRemovedPath) {
    return (
      <SessionProvider session={session}>
        <AuthLayout>
          <div>
            <Toaster />
          </div>
          <Component {...pageProps} />
          <Analytics />
        </AuthLayout>
      </SessionProvider>
    )
  }
  else if (isErrorLayout) {
    return (
      <SessionProvider session={session}>
        <ErrorLayout>
          <Component {...pageProps} />
          <Analytics />
        </ErrorLayout>
      </SessionProvider>
    )
  }
  else if (isLandingPage) {
    return (
      <ThemeProvider>
        <SessionProvider session={session}>
          {/* <Layout> */}
          <div>
            <Toaster />
          </div>
          <Component {...pageProps} />
          <Analytics />
          {/* </Layout > */}
        </SessionProvider>
      </ThemeProvider>
    )
  }
  else {
    return (
      <ThemeProvider>
        <SessionProvider session={session}>
          <Layout>
            <div>
              <Toaster />
            </div>
            <Component {...pageProps} />
            <Analytics />
          </Layout >
        </SessionProvider>
      </ThemeProvider>
    )
  }
}
