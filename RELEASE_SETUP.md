# Release Setup for SSH Authentication

## Using SSH with semantic-release

### Option 1: GitHub Actions with SSH (Recommended)

1. **Generate SSH key pair** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/github_deploy_key
   ```

2. **Add public key to GitHub**:
   - Go to your repository → Settings → Deploy keys
   - Add the contents of `~/.ssh/github_deploy_key.pub`
   - Check "Allow write access"

3. **Add private key to GitHub Secrets**:
   - Go to your repository → Settings → Secrets → Actions
   - Create a new secret named `GIT_SSH_PRIVATE_KEY`
   - Add the contents of `~/.ssh/github_deploy_key`

4. **GitHub Actions will now use SSH** for pushing release commits

### Option 2: Local Release with SSH

Run semantic-release locally using your existing SSH credentials:

```bash
# Dry run to test
GIT_AUTHOR_NAME="Your Name" \
GIT_AUTHOR_EMAIL="your-email@example.com" \
GIT_COMMITTER_NAME="Your Name" \
GIT_COMMITTER_EMAIL="your-email@example.com" \
NPM_TOKEN="your-npm-token" \
npx semantic-release --dry-run

# Actual release
GIT_AUTHOR_NAME="Your Name" \
GIT_AUTHOR_EMAIL="your-email@example.com" \
GIT_COMMITTER_NAME="Your Name" \
GIT_COMMITTER_EMAIL="your-email@example.com" \
NPM_TOKEN="your-npm-token" \
npx semantic-release
```

### Option 3: Use Personal Access Token (Alternative)

If you prefer not to use SSH:

1. Create a GitHub Personal Access Token with `repo` scope
2. Update `.releaserc.json` to use HTTPS:
   ```json
   "repositoryUrl": "https://github.com/getpaidhq/typescript-sdk.git"
   ```
3. Set the token in GitHub Secrets as `GITHUB_TOKEN`

## Required Secrets Summary

For automated releases via GitHub Actions:

- **NPM_TOKEN**: Your NPM access token for publishing
- **GIT_SSH_PRIVATE_KEY**: SSH private key for Git push (optional, uses GITHUB_TOKEN by default)

## Testing

Test your setup locally:
```bash
npx semantic-release --dry-run --no-ci
```