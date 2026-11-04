#!/usr/bin/env python3
"""Search the navigation index and audit it against a local learningPages checkout."""

import argparse
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "references"
SUBJECTS = {
    "circuits": "circuits.tsv",
    "electronics": "electronics.tsv",
    "engineering-math": "engineering-math.tsv",
    "solid-state": "solid-state.tsv",
}
FIELDS = ("chapter", "id", "title", "type", "topic", "source", "repo_path")
CARD = re.compile(r"<PracticeCard\b([^>]*?)(?:/?>)", re.S)
ATTR = re.compile(r'([\w-]+)="([^"]*)"')


def load(subject):
    names = [subject] if subject else SUBJECTS
    for name in names:
        with (ROOT / SUBJECTS[name]).open(encoding="utf-8", newline="") as file:
            for row in csv.DictReader(file, delimiter="\t"):
                yield {"subject": name, **row}


def find(args):
    terms = [s.casefold() for s in args.text]
    rows = [r for r in load(args.subject)
            if (not args.chapter or r["chapter"] == args.chapter)
            and (not args.type or r["type"] == args.type)
            and (not args.id or r["id"] == args.id)
            and all(s in " ".join(r[k] for k in ("id", "title", "topic", "source")).casefold()
                    for s in terms)]
    # Stable order enables reproducible sampling by callers. Group fetches by repo_path.
    print(json.dumps({"count": len(rows), "items": rows[:args.limit],
                      "source_files": sorted({r["repo_path"] for r in rows[:args.limit]})},
                     ensure_ascii=False, indent=2))


def audit(args):
    repo = Path(args.repo).resolve()
    indexed = {(r["subject"], r["id"]): r for r in load(None)}
    discovered = {}
    errors = []
    for subject in SUBJECTS:
        paths = {r["repo_path"] for r in indexed.values() if r["subject"] == subject}
        # Search the subject's practice sources too, so a new source file is visible.
        directory = {"circuits": "circuits/practice", "electronics": "electronics/practice-source",
                     "engineering-math": "engineering-math/practice", "solid-state": "solid-state/practice"}[subject]
        paths.update(p.relative_to(repo).as_posix() for p in (repo / "docs" / directory).glob("*.md"))
        for path in sorted(paths):
            file = repo / path
            if not file.is_file():
                errors.append(f"missing source: {path}")
                continue
            for match in CARD.finditer(file.read_text(encoding="utf-8")):
                attrs = dict(ATTR.findall(match.group(1)))
                if not attrs.get("id"):
                    errors.append(f"missing id: {path}")
                    continue
                key = (subject, attrs["id"])
                if key in discovered:
                    errors.append(f"duplicate id: {subject}/{attrs['id']}")
                discovered[key] = {**attrs, "repo_path": path}
    added = sorted(set(discovered) - set(indexed))
    removed = sorted(set(indexed) - set(discovered))
    changed = []
    for key in sorted(set(indexed) & set(discovered)):
        old, new = indexed[key], discovered[key]
        delta = {k: [old[k], new.get(k, "")] for k in ("title", "type", "topic", "source", "repo_path")
                 if old[k] != new.get(k, "")}
        if delta:
            changed.append({"key": key, "fields": delta})
    report = {"indexed": len(indexed), "source_cards": len(discovered),
              "added": added, "removed": removed, "changed": changed, "errors": errors}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return bool(added or removed or changed or errors)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    query = sub.add_parser("find")
    query.add_argument("--subject", choices=SUBJECTS)
    query.add_argument("--chapter")
    query.add_argument("--type")
    query.add_argument("--id")
    query.add_argument("--limit", type=int, default=30)
    query.add_argument("text", nargs="*")
    check = sub.add_parser("audit")
    check.add_argument("--repo", required=True, help="Path to a complete learningPages checkout")
    args = parser.parse_args()
    if args.command == "find":
        find(args)
    else:
        raise SystemExit(1 if audit(args) else 0)


if __name__ == "__main__":
    main()
