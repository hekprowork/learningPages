export function candidateIndexUrl(endpoint, entries) {
  if (!endpoint || !entries.length) return ''

  let url
  try {
    url = new URL('/selection.tsv', endpoint)
  } catch {
    return ''
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return ''
  url.searchParams.set('subject', entries[0].subject)
  url.searchParams.set('ids', entries.map(entry => entry.id).join(','))
  return url.href
}
