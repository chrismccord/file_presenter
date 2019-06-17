
export default function isSnippet(text) {
  if(text.length <= 6) return false;
  const trimedText = text.trim();
  const first = trimedText.substring(0, 3)
  const last = trimedText.substring(trimedText.length - 3, trimedText.length);
  if(first == '```' && last == '```') {
    return true;
  }
  return false;
}
