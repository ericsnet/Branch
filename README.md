# Branch

Branch is a bilingual (Spanish/English) probability-tree editor. It is a static web app designed for GitHub Pages and Cloudflare Pages.

## Features

- Build probability trees with branches and terminal outcomes.
- Enter probabilities manually or derive them from favourable cases / total cases.
- Exact path probability calculation (multiplication along a path).
- Conditional probability support through branch probabilities at each decision point.
- Monte Carlo simulations with configurable repetitions.
- Horizontal and vertical tree layouts.
- Node labels, colours, notes, duplicate/delete actions.
- Validation for missing probabilities and branch totals different from 100%.
- JSON import/export, SVG and PNG export, and print-to-PDF.
- Local browser storage; no account or server-side database required.
- Share a project as a JSON file or encoded URL.
- Built-in templates and responsive interface.

## Run locally

Open \`index.html\` in a modern browser. No build step or dependencies are required.

## Deploy

- **GitHub Pages:** configure Pages to deploy from the \`main\` branch, root folder.
- **Cloudflare Pages:** connect this repository, use \`main\` as production branch, and leave the build command empty. Output directory: \`/\`.

## Data and privacy

Projects are stored in the browser's localStorage on the device where they are created. Clearing browser data can erase local projects, so export JSON backups regularly. Shared links embed project data in the URL; anyone with the link can inspect and edit their own copy. This is not an access-control system and does not provide collaborative live editing or private cloud storage.

## Limitations in this initial version

- Branch probabilities are interpreted as conditional probabilities given the path to their parent node.
- Monte Carlo simulation samples from the currently defined outgoing branch probabilities. If sibling probabilities do not total 100%, sampling normalizes their relative weights while the validation panel warns about the mismatch.
- The advanced statistics view is an initial summary; full marginal/conditional query builder, drag-and-drop node positioning, project folders, custom template management and real permissioned collaboration are not yet implemented.
- PDF export uses the browser print dialog.

## License

No license has been added. All rights remain with the repository owner unless a license is added.
