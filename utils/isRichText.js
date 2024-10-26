
export default function isRichText(content) {
  return /<[^>]+>/.test(content);
}
