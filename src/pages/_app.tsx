import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '@/styles/theme'
import { AuthProvider } from '@/hooks/auth'
import createEmotionCache from '@/utils/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </CacheProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
