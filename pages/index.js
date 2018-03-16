import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = ({ shows }) => (
  <div>
    <p>Hello Next.js</p>
    <Link as="owner/post-property" href="postProperty/owner">
      <a>Link</a>
    </Link>
    <ul>
      {shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index