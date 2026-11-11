const encode = value => encodeURIComponent(String(value))

export const chapterReaderPath = (subject, chapter) => `/question-reader/${subject}/chapter-${encode(chapter)}.html`
export const offlineChapterPath = (subject, chapter) => `/question-reader-offline/${subject}/chapter-${encode(chapter)}.html`
