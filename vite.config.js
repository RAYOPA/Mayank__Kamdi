import { defineConfig } from 'vite';
import { existsSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const pages = {
  home: 'index.html',
  portfolio: 'portfolio/index.html',
  tracks: 'tracks/index.html',
  guide: 'guide/index.html',
  announcements: 'announcements/index.html',
  sponsors: 'sponsors/index.html',
  history: 'history/index.html',
  signin: 'signin/index.html',
  dashboard: 'dashboard/index.html',
  mentorRegister: 'mentors/register/index.html',
  mentorDirectory: 'mentors/directory/index.html',
  statements: 'statements/index.html',
  hackathonStatements: 'statements/hackathon/index.html',
  init: 'init/index.html',
  initStudentRegister: 'init/register/index.html',
  initSpocRegister: 'init/spoc/register/index.html',
  forge: 'forge/index.html',
  openInnovation: 'addons/open_innovation/index.html',
  research: 'addons/research/index.html',
  privacy: 'privacy/index.html',
  participationTerms: 'participation-terms/index.html',
  organizingTeam: 'organizing-team/index.html',
  leaderboard: 'leaderboard/index.html',
};

function directoryIndexRoutes() {
  const rewrite = (request, _response, next) => {
    const [pathname, query = ''] = (request.url || '/').split('?', 2);
    if (pathname === '/' || pathname.endsWith('/') || extname(pathname)) return next();

    let decodedPath;
    try {
      decodedPath = decodeURIComponent(pathname);
    } catch {
      return next();
    }

    const directory = resolve(root, `.${decodedPath}`);
    const indexFile = resolve(directory, 'index.html');
    if (!indexFile.startsWith(`${root}${sep}`) || !existsSync(indexFile)) return next();

    request.url = `${pathname}/index.html${query ? `?${query}` : ''}`;
    next();
  };

  return {
    name: 'bios-extensionless-directory-routes',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [directoryIndexRoutes()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, relativePath]) => [name, resolve(root, relativePath)]),
      ),
    },
  },
});
