// Build-time provenance for the docs site footer. Resolves the commit this
// build was produced from: in CI the deploy workflow sets GITHUB_SHA; locally
// we read the working tree's HEAD, and fall back to 'dev' when git is absent.
// Evaluated once per build (ES module singleton), not per page.
import { execSync } from 'node:child_process';

function resolveCommitSha() {
  const ciSha = process.env.GITHUB_SHA;
  if (ciSha) {
    return ciSha.slice(0, 7);
  }
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return 'dev';
  }
}

export const COMMIT_SHA = resolveCommitSha();
export const BUILD_DATE = new Date().toISOString().slice(0, 10);
