---
name: learningpages-question-bank-local
description: Search, retrieve, audit, and maintain the learningPages question bank in this repository. Use when finding or adding circuits, electronics, engineering-math, or solid-state questions, examples, exercises, or question-index TSV entries.
---

# Local learningPages question bank

## Search and read

- Read `references/index.md` for the indexed subjects, counts, and source snapshot.
- Search by exact subject, chapter, type, ID, and topic. Example:
  `python .agents/skills/learningpages-question-bank-local/scripts/question_index.py find --subject circuits --chapter 4 --type example`
- TSV rows are navigation metadata, not question text. Read the matching `repo_path` from the repository root and verify the full question and any referenced image before using it.
- Use the local checkout first. The corresponding GitHub source path is `https://github.com/hekprowork/learningPages/blob/main/<repo_path>`.

## Add or update a question

1. Follow the root `AGENTS.md` and the subject-specific `docs/<subject>/AGENTS.md` when present.
2. Add or update the original `PracticeCard` in the appropriate subject source file under `docs/`, including required figures and source details. Check that its ID is unique within that subject.
3. Add or update the matching row in the subject TSV. Keep the header and field order: `chapter, id, title, type, topic, source, repo_path`.
4. Run `python .agents/skills/learningpages-question-bank-local/scripts/question_index.py audit --repo .`. Review any added, removed, changed, duplicate, or missing-source entries. The audit reports differences; it does not rewrite TSV files.
5. After reviewing the audit, update the counts and source snapshot in `references/index.md` when needed. Keep question source files and their index changes together.
6. Do not commit or push to GitHub unless the user explicitly asks.

