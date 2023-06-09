import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
/* import styles from '../styles/Home.css' */
import { useEffect, useState } from 'react'
/* import Head from 'next/head' */

const inter = Inter({ subsets: ['latin'] })

export default function Home(data) {
  const [formInput, setFormInput]= useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(data.data.data)
  }, [data])

  const search = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${e.target.search.value}&api_key=lZQSg0YtDHnpfwBmMHFMSsougRBCtR7A&limit=10`)
    const gifs = await response.json();
    setSearchResults(gifs.data)
    setSearchTerm("")
  }

  const handleInput = (e) => {
    setFormInput(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={search}>
        <input type="text" name="search" onChange={handleInput}/>
        <button type="submit">Search</button>
      </form>
      <div className={styles.grid}>
            {Array.isArray(searchResults) && searchResults.map((gif) => {
             return (
          <div key={gif.id}>
            <img src={gif.images.original.url} alt={gif.title} />
          </div>
        );
      })}
      </div>
    </>
  )
}
export async function getStaticProps() {
  const res = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=lZQSg0YtDHnpfwBmMHFMSsougRBCtR7A&limit=10')
  const data = await res.json()
  return {
    props: {
      data: data
    }
  }
}
