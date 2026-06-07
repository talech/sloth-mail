# SlothMail

A tiny pocket of sloth-powered kindness.

## Make changes locally

1. Install [Node.js](https://nodejs.org/) if needed.
2. Run `npm install` once.
3. Run `npm run dev`.
4. Open the local address shown in the terminal.

Most of the app, including its messages, lives in `src/App.tsx`. Styles live in
`src/styles.css`.

Progress is automatically saved in the visitor's browser. It survives refreshes
and return visits on the same browser and device. Clearing browser data or using
a different device starts a fresh save.

## Publish with GitHub Pages

1. Create an empty GitHub repository and name its default branch `main`.
2. Push this project to that repository.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.

Every push to `main` will then publish the latest version. The workflow also
supports manual publishing from the repository's **Actions** tab.
