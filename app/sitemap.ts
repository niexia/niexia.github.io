import { promises as fs } from 'fs';
import path from 'path';

export const revalidate = false;

const isSsgBuild = process.env.SSG === 'true';
const SITE_URL = isSsgBuild ? 'https://niexia.github.io' : 'https://yangjin.dev';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

/** 
 * generate sitemap.xml file
 * sitemap.(xml|js|ts) is a special file that matches the Sitemaps XML format to help search engine crawlers index your site more efficiently.
 */
export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'posts');
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${SITE_URL}/posts/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = ['', '/posts', '/projects', '/links'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...notes];
}