declare module '*.mdx' {
  export const metadata: {
    title: string
    date: string
    description: string
    tag?: string[]
    duration?: string
  }
}