
# Payload Portal Hub

A comprehensive guide for rocket payload specifications and launch vehicle compatibility.

## Deployment with GitHub Pages and Custom Domain

### 1. DNS Configuration for payloadportal.dev

Configure your domain registrar with the following DNS records:

#### A Records
Point your apex domain (payloadportal.dev) to GitHub Pages IP addresses:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

#### CNAME Record (optional, for www subdomain)
```
CNAME   www   justrocketsci.github.io
```

⚠️ **Important**: DNS propagation can take up to 48 hours. The GitHub Pages DNS check may show "unsuccessful" until propagation is complete.

### 2. GitHub Repository Setup

1. Ensure the repository has these files:
   - `CNAME` (in root) containing: payloadportal.dev
   - `public/CNAME` containing: payloadportal.dev
   - `.github/workflows/deploy.yml` for automatic deployment

2. Configure GitHub Pages:
   - Go to repository Settings > Pages
   - Under "Build and deployment" select "GitHub Actions"
   - Under "Custom domain" enter: payloadportal.dev
   - Check "Enforce HTTPS" once certificate is issued

### 3. Development

```sh
# Clone the repository
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

