import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '../components/navbar/navbar';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className='p-4'><Component {...pageProps} /></div>
    </QueryClientProvider>
  );
}

export default MyApp
