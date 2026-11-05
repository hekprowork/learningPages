// IDs are the stable PracticeCard IDs recorded in the question-index TSVs.
// Repeated ids parameters and comma-separated values are both accepted.
export function getSelectedIds(search) {
  const params = new URLSearchParams(search)
  if (!params.has('ids')) return null
  return new Set(params.getAll('ids').flatMap((value) => value.split(',')).map((id) => id.trim()).filter(Boolean))
}
