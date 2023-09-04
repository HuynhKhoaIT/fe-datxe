import Image from 'next/image'
import styles from './page.module.css'
import {MyFooter} from './components/footer/footer'



export default function Home() {
  return <div>
    <h1>Hello, Home page!</h1>
    <MyFooter/>
  </div>
}
