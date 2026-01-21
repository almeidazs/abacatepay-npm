# Contributing – AbacatePay Monorepo

Thank you for your interest in contributing to the AbacatePay open-source ecosystem 🥑  
This monorepo contains multiple official AbacatePay packages and tools.

These guidelines help keep contributions consistent, secure, and maintainable.

---

## Code of Conduct

All contributors must follow the **AbacatePay Code of Conduct**.  
Report unacceptable behavior to **security@abacatepay.com**.

---

## Issues First

**Opening a GitHub Issue is required before submitting a Pull Request**, except for trivial fixes (typos, small doc changes).

Why:
- Align changes with maintainers and roadmap  
- Avoid duplicated or rejected work  

Do not start coding before receiving feedback or approval.

---

## How to Contribute

You can contribute by:
- Reporting bugs  
- Suggesting features or improvements  
- Improving documentation  
- Submitting code via Pull Requests  

---

## Contribution Flow

1. **Fork & clone** the repository  
2. **Create a branch** from the default development branch  
3. **Follow the setup instructions** of the package you’re modifying  
4. **Write clean code**, add tests when needed, update docs if behavior changes  
5. **Commit using Conventional Commits**
6. **Open a Pull Request**, linking the related Issue  

---

## Commits

Use **Conventional Commits**:

- `feat: add new webhook event`
- `fix: handle timeout retry`
- `docs: update setup guide`

Keep commits focused. Never commit secrets.

---

## Versioning & Changesets

Some packages use **Changesets** for versioning.

If required:

```bash
bunx changeset
```

Follow semantic versioning:
- `patch` – bug fixes
- `minor` – backward-compatible features
- `major` – breaking changes

---

## Review Process

- All PRs are reviewed by maintainers  
- CI must pass before approval  
- Be ready to address feedback  

---

## What to Avoid

- PRs without an approved Issue  
- Mixing unrelated changes in one PR  
- Vague commits or descriptions  
- Ignoring CI failures or review comments  

---

## Security

Do **not** report security issues publicly.  
Follow `SECURITY.md` or contact **security@abacatepay.com**.

---

Thanks for contributing to AbacatePay!  
Your work helps build reliable and secure payment infrastructure.

