import { compareDesc, } from 'date-fns'
import { allPosts } from '../data/allPosts'
import { PostCard } from '../components/Postcard'


export default function Posts() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.metadata.date), new Date(b.metadata.date)))

  return (
    <div className="mx-auto">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}