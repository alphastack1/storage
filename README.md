# Storage

A repository for hosting downloadable release files (APKs, binaries, etc.) via GitHub Releases.

## How It Works

Each project gets its own **branch** (for README/docs) and **GitHub Release** (for large files like APKs). The `main` branch contains only this README.

### Current Projects

| Branch | Release Tag | Description |
|--------|-------------|-------------|
| `bonsai-llm` | `bonsai-llm-v1.0.0` | Bonsai LLM Android app (254MB APK) |

### Download Links

Large files are hosted as GitHub Release assets. The direct download pattern:

```
https://github.com/alphastack1/storage/releases/download/<tag>/<filename>
```

### Adding a New Project

1. Create an orphan branch for the project README:
   ```bash
   git checkout --orphan <project-name>
   git rm -rf .
   # Add a README.md with download links and install instructions
   git add README.md
   git commit -m "Add <project-name> branch"
   git push origin <project-name>
   ```

2. Create a GitHub Release for the large file(s):
   ```bash
   gh release create <project-name>-v1.0.0 ./my-file.apk \
     --title "<Project Name> v1.0.0" \
     --notes "Release notes here"
   ```

3. Update this README's table on `main`.

### Updating an Existing Release

```bash
# Delete old release, create new one
gh release delete <tag> -y
gh release create <new-tag> ./updated-file.apk \
  --title "<Project Name> vX.Y.Z" \
  --notes "What changed"
```

> **Why Releases instead of branch commits?** GitHub rejects files over 100MB in regular commits. Releases support up to 2GB per asset.
