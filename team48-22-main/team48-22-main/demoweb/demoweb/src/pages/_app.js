import '@/styles/globals.css'
import '@/styles/tags.css';

export default function App({ Component, pageProps }) {
  return <Component className="EApp" {...pageProps} />
}