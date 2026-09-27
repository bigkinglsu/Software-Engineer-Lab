# Software Engineer Lab

An interactive Angular career fair station. Students change values in a code-like panel, run a robot, diagnose three small failures, and earn a completion screen. Each successful completion increments a counter stored in this browser. No account or backend is needed.

## Run it

1. Install Node.js and npm, then run `npm install` in this folder while online.
2. Run `npm start` and open `http://localhost:4200` on the laptop.
3. Before the fair, launch it once and test a full run. After dependencies are installed, the local development server and app work without internet.
4. For a deployable static version, run `npm run build`. The browser files are under `dist/software-engineer-lab/browser/`.

## Deploy with GitHub Pages

1. For hosting with GitHub Free, use a public repository.
2. In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Commit and push `.github/workflows/deploy-pages.yml` to `main`.
4. Open **Actions → Deploy to GitHub Pages** and wait for the build and deploy jobs to finish. The deployment summary links to the published site, normally `https://bigkinglsu.github.io/Software-Engineer-Lab/`.

Every push to `main` rebuilds and deploys the app. You can also select **Run workflow** on the workflow's Actions page. The workflow installs locked dependencies, checks TypeScript, builds the app with the Pages base path, and uploads only `dist/software-engineer-lab/browser/`. No personal access token or custom secret is needed.

To check the project-site build locally, run `npm run check` and `npm run build -- --base-href /Software-Engineer-Lab/`. The completion count remains local to each browser; hosting does not create a shared counter.

## At the table

Ask, “Want to try being a software engineer?” Have the student press **Run program** first. After each failure, ask what value might control the problem. Let them change the highlighted value, test again, and advance. The three fixes are `powerOn = true`, `gateOpen = true`, and `speed >= 7`. Name and color are optional personalization. **Next engineer** resets the challenge but keeps the count. Sound starts off; the toggle enables synthesized tones without audio files.

The displayed code is a teaching view of the Angular state, not an arbitrary code interpreter. Students edit the values through accessible controls. Keep the browser in full screen for a clean station; bring a charger and test the school's display setup in advance.
