---
name: git-change-review
description: Reviews code changes from git diff, a specific commit, or an entire branch with a focus on correctness, architecture, code quality, performance, and security. Use only when the user explicitly asks for a review of changes, a diff, a commit, a branch, or a PR.
allowed-tools: Bash(git:*) Read
---

# Git Change Review

## Purpose

This skill reviews Git-based changes and returns findings only.

Supported modes:

- current uncommitted changes (`git diff`, both staged and unstaged)
- a specific commit
- a full branch relative to a base branch

## When To Use

Apply this skill only when the user explicitly asks for a review.

Example triggers:

- "review this diff"
- "review this branch"
- "review this commit"
- "review this PR"

Do not apply this skill for general code explanation or refactoring requests unless the user explicitly asks for a review.

## Determine The Scope

First determine what the user wants reviewed:

1. `diff`
   - If the user asks to review current changes, inspect both staged and unstaged diffs.
2. `commit`
   - If the user provides a SHA or asks to review a commit, analyze that commit in full.
3. `branch`
   - If the user asks to review a branch or PR, analyze all included commits and the combined diff against the base branch.

If the scope is unclear, ask one short clarifying question.

If the base branch is not specified, default to checking `main`, then `master`, then the tracking branch if appropriate.

## Gather Context

Start from git state rather than reading random files.

Minimum set:

- for `diff`: `git status`, `git diff`, `git diff --staged`
- for `commit`: `git show --stat --patch <sha>`
- for `branch`: `git status`, `git log --oneline <base>..HEAD`, `git diff <base>...HEAD`

After that, read only the files and code regions that are actually changed or needed to validate impact.

Do not limit yourself to the patch if adjacent or related code is necessary to verify behavior.

## What To Check

Look for defects and risks first, not a restatement of the changes.

Primary categories:

- logic correctness and likely regressions
- architectural issues and broken responsibility boundaries
- code quality and maintainability
- performance and inefficient operations
- security: input validation, authorization, data exposure, injections, unsafe assumptions

Also check for:

- broken contracts and API incompatibilities
- incorrect error handling
- race conditions and state-related issues
- N+1 risks, unnecessary queries, excessive allocations, unbounded loops, or loading too much data into memory

## Tests

Tests are not required as a separate section of the review.

If the changes modify existing tests or add new ones, verify:

- whether the test actually proves the claimed behavior
- whether there is a false-positive path
- whether mocks hide a real issue

If confidence in a finding depends on running a test and it is reasonable to do so, run a targeted test or minimal verification.

## How To Write Findings

Return findings only, with no summary and no “overall looks good” commentary.

Order:

1. Most severe issues first.
2. Then medium-severity issues.
3. Then low-severity issues, only if they are worth mentioning.

Each finding should include:

- a short statement of the issue
- where it is located
- why it is a problem
- what scenario breaks or what risk it creates

Prefer claims that can be validated.

Good:

- `High:` the new condition skips the permission check in `ResultService`, so a user without the required role can access another user's data.
- `Medium:` the cache is invalidated on create but not on update, so the API can return stale data.

Bad:

- "this code looks odd"
- "the architecture is not great"

## Output Format

Return only a list of findings.

Recommended format:

- `High:` issue description with file or symbol reference
- `Medium:` issue description with file or symbol reference
- `Low:` issue description with file or symbol reference

If no issues are found, reply with a single line:

`No findings.`

## What Not To Do

- Do not turn the review into a changelog.
- Do not restate the diff unless it helps explain a problem.
- Do not focus on style unless it affects readability, maintainability, or defect risk.
- Do not invent issues without tying them to concrete behavior.
- Do not add sections like `summary`, `open questions`, `praise`, or `test plan` unless the user explicitly asks for them.
