import Layout from '@/components/Layout'
import AuthLayout from '@/components/AuthLayout'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  const router = useRouter()

  const removedPathFromLayout = ['/login', '/register', '/reset-password']
  const isRemovedPath = removedPathFromLayout.includes(router.pathname)

  if (isRemovedPath) {
    return (<AuthLayout><Component {...pageProps} /></AuthLayout>)
  } else {
    return (<Layout>
      <ProfileSettingsModal />
      <Component {...pageProps} />
    </Layout >
    )
  }
}
