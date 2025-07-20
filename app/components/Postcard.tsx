import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts } from '../data/allPosts'

type Post = (typeof allPosts)[number]

function PostCard(post: Post) {
  const { url, metadata } = post
  return (
    <div className="mb-4">
      <h2 className="mb-1 font-medium leading-snug">
        <Link
          href={url}
          className="text-blue-600 hover:underline underline-offset-2 dark:text-gray-400 hover:dark:text-gray-300 dark:decoration-gray-800"
        >
          {metadata.title}
        </Link>
      </h2>
      <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
        <time
          dateTime={metadata.date}
          className="text-gray-500 dark:text-gray-400"
        >
          {format(parseISO(metadata.date), 'LLLL d, yyyy')}
        </time>
        {metadata.duration && 
          <span className='text-gray-500 dark:text-gray-400'>· {metadata.duration}</span>
        }
        {metadata.tag && metadata.tag.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">{metadata.description}</div>
    </div>
  )
}

export { PostCard }