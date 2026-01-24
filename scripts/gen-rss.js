/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const postsDir = path.resolve(__dirname, "../app/posts");
const outputFile = path.resolve(__dirname, "../public/rss.xml");

const isSsgBuild = process.env.SSG === "true";
const SITE_URL = isSsgBuild ? "https://niexia.github.io" : "https://yangjin.dev";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith("page.mdx") && file !== "page.tsx") {
      results.push(filePath);
    }
  });
  return results;
}

function findMetadataObjectLiteral(source) {
  const exportIndex = source.indexOf("export const metadata");
  if (exportIndex < 0) return null;

  const eqIndex = source.indexOf("=", exportIndex);
  if (eqIndex < 0) return null;

  const openIndex = source.indexOf("{", eqIndex);
  if (openIndex < 0) return null;

  let depth = 0;
  let inString = null;
  let escaped = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === inString) {
        inString = null;
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inString = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) {
      return source.slice(openIndex, i + 1);
    }
  }

  return null;
}

function parseMetadataFromMdx(source) {
  const objectLiteral = findMetadataObjectLiteral(source);
  if (!objectLiteral) return null;
  try {
    return vm.runInNewContext(`(${objectLiteral})`, Object.create(null), { timeout: 50 });
  } catch {
    return null;
  }
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value) {
  const safe = String(value).replace(/]]>/g, "]]]]><![CDATA[>");
  return `<![CDATA[${safe}]]>`;
}

function toRfc822(dateLike) {
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

const mdxFiles = walk(postsDir);
const posts = mdxFiles
  .map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const metadata = parseMetadataFromMdx(content);
    if (!metadata || !metadata.title || !metadata.date) return null;

    const relPath = path.relative(postsDir, file).replace(/\\/g, "/");
    const slug = relPath.replace(/\/page\.mdx$/, "").replace(/\.mdx$/, "").replace(/\/index$/, "");
    const urlPath = `/posts/${slug}`;
    const absoluteUrl = `${SITE_URL}${urlPath}`;

    const tags = Array.isArray(metadata.tag) ? metadata.tag.slice(0, 2) : [];

    return {
      urlPath,
      absoluteUrl,
      title: metadata.title,
      description: metadata.description || "",
      date: metadata.date,
      tags
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const channelTitle = "Yang Jin Blog";
const channelLink = `${SITE_URL}/posts`;
const channelDescription = "Posts feed: title, description and tags.";

const itemsXml = posts
  .map((p) => {
    const categories = (p.tags || []).map((t) => `<category>${xmlEscape(t)}</category>`).join("");
    return [
      "<item>",
      `<title>${xmlEscape(p.title)}</title>`,
      `<link>${xmlEscape(p.absoluteUrl)}</link>`,
      `<guid isPermaLink="true">${xmlEscape(p.absoluteUrl)}</guid>`,
      `<pubDate>${xmlEscape(toRfc822(p.date))}</pubDate>`,
      `<description>${cdata(p.description)}</description>`,
      categories,
      "</item>"
    ].join("");
  })
  .join("");

const rssXml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
  "<channel>",
  `<title>${xmlEscape(channelTitle)}</title>`,
  `<link>${xmlEscape(channelLink)}</link>`,
  `<description>${xmlEscape(channelDescription)}</description>`,
  `<atom:link href="${xmlEscape(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
  itemsXml,
  "</channel>",
  "</rss>",
  ""
].join("\n");

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, rssXml, "utf8");
console.log("rss.xml generated!");

