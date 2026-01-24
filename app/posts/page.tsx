"use client"

import { compareDesc, } from 'date-fns'
import { allPosts } from '../data/allPosts'
import { PostCard } from '../components/Postcard'
import { Tag } from '../components/Tag'
import { useMemo, useState } from 'react'

export default function Posts() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.metadata.date), new Date(b.metadata.date)))
  const tags = [...new Set(posts.flatMap((post) => post.metadata.tag ?? []))]
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredPosts = useMemo(() => {
    return selectedTags.length
      ? posts.filter((post) => selectedTags.some((tag) => post.metadata.tag?.includes(tag)))
      : posts;
  }, [selectedTags, posts])

  return (
    <div className="mx-auto">
      <Tag options={tags} value={selectedTags} onChange={setSelectedTags} checkable multiple className="mb-4" />
      {filteredPosts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}