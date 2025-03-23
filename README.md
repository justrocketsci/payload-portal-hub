
# Payload Portal Hub

A comprehensive guide for rocket payload specifications and launch vehicle compatibility.

## Deployment with GitHub Pages

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch:

1. The GitHub Actions workflow in `.github/workflows/deploy.yml` handles the build and deployment
2. The site is deployed to your custom domain: payloadportal.dev
3. CNAME records are automatically configured through the CNAME file in the public directory

### Custom Domain Setup

To use your custom domain (payloadportal.dev):

1. Ensure you've configured your domain provider's DNS settings:
   - Add an A record pointing to GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to your GitHub Pages site: yourusername.github.io

2. Ensure the CNAME file exists in the `public` directory with your domain name
3. In GitHub repository settings, under Pages, verify your custom domain is properly configured

## Development

```sh
# Clone the repository (if working locally)
git clone https://github.com/justrocketsci/payload-portal-hub.git

# Navigate to project directory
cd payload-portal-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
