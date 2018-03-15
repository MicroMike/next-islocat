import Link from 'next/link'

const Index = () => (
  <div>
    <p>Hello Next.js</p>
    <Link as="owner/post-property" href="postProperty/owner">
      <a>Link</a>
    </Link>
  </div>
)

export default Index