
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c0018e9c-6223-4938-b372-d87df84d5ea1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c0018e9c-6223-4938-b372-d87df84d5ea1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy with GitHub Pages

To deploy this project using GitHub Pages with a custom domain, follow these steps:

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Set up GitHub Pages in your repository**
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Set the source to "GitHub Actions"
   - Create a GitHub Actions workflow (instructions below)

3. **Create a GitHub Actions workflow file**
   Create a file at `.github/workflows/deploy.yml` with the following content:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: dist
             branch: gh-pages
   ```

4. **Configure your custom domain**
   - Add a CNAME file to the `public` directory with your domain name
   - Configure your domain's DNS settings:
     - Add an A record pointing to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
     - Or add a CNAME record pointing to your GitHub Pages URL (`username.github.io`)

5. **Push these changes to your repository**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push
   ```

6. **Verify your deployment**
   - Go to your repository's Settings > Pages
   - Ensure your custom domain is set correctly
   - Check the "Enforce HTTPS" option if available

## I want to use a custom domain - is that possible?

Yes! Follow the GitHub Pages deployment instructions above, which include steps for setting up a custom domain.
