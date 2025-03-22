
# Payload Portal Hub

A comprehensive guide for rocket payload specifications and launch vehicle compatibility.

## Deployment with Lovable

This project is designed to be deployed using Lovable's built-in publishing system:

1. Click the "Publish" button in the top right of the Lovable editor
2. Follow the prompts to deploy your application
3. Your site will be available at a Lovable subdomain (yoursite.lovable.app)

### Custom Domain Setup

To use a custom domain like payloadportal.dev:

1. Navigate to Project > Settings > Domains in Lovable
2. Add your custom domain
3. Follow Lovable's specific DNS configuration instructions:
   - This typically involves adding CNAME records pointing to your Lovable app
   - Or using specific A records provided by Lovable (not GitHub Pages IPs)
4. Wait for DNS propagation (can take up to 48 hours)
5. Ensure SSL is properly configured for your domain

⚠️ **Important**: Do not use GitHub Pages A records for Lovable deployments.

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
```
