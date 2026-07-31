# Task 01 — Git Workflows

## 🎯 Objective

Implement a professional Git branching strategy with pull requests and code review.

---

## Instructions

### Git Flow Strategy

```
main          ●─────────────────────────────────────● Production
              │                                     ↑
develop       ●──────────────────────────────────●──● Staging
              │        ↑              ↑           │
feature/...   ●──●──●──┘   ●──●──●───┘           │
                               ↑                  │
hotfix/...                     └──────────────────┘
```

### Branch Naming Convention

```bash
feature/add-wishlist          # New features
feature/user-profile-page
bugfix/cart-quantity-error    # Bug fixes
hotfix/payment-crash          # Urgent production fix
release/v1.2.0                # Release preparation
```

### Daily Workflow

```bash
# 1. Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/product-reviews

# 2. Work on the feature
git add .
git commit -m "feat: add product review schema"
git commit -m "feat: add review endpoints with validation"
git commit -m "test: add review API tests"

# 3. Push and open PR
git push origin feature/product-reviews
# → Open Pull Request on GitHub: feature/product-reviews → develop
```

### Commit Message Convention (Conventional Commits)

```bash
feat: add dark mode toggle
fix: resolve cart total calculation bug
docs: update API endpoint documentation
refactor: extract cart logic to service layer
test: add unit tests for price utils
chore: update dependencies
```

Format: `type(scope): description`

### Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## What does this PR do?
Brief description of the changes.

## How to test?
1. Step 1
2. Step 2

## Checklist
- [ ] Tests pass (`npm test`)
- [ ] No console.log statements
- [ ] Environment variables documented
- [ ] API endpoints tested in Postman

## Screenshots (if UI changes)
Before | After
```

### Branch Protection Rules

GitHub → Repository → **Settings** → **Branches** → Add rule for `main`:

- ✅ Require pull request before merging
- ✅ Require at least 1 approver
- ✅ Require status checks to pass (CI tests)
- ✅ Require branches to be up to date
- ❌ Allow force push

---

## 💡 Git Commands Cheatsheet

```bash
git status                    # See changed files
git diff                      # See changes
git log --oneline --graph     # Visual branch history
git stash                     # Save work temporarily
git stash pop                 # Restore stashed work
git cherry-pick <hash>        # Apply a specific commit
git rebase -i HEAD~3          # Interactive rebase (clean history)
git bisect start              # Find which commit introduced a bug
```

---

[Next Task → GitHub Actions CI](./task-02-github-actions-ci.md)

[← Back to Module 15](../README.md)
