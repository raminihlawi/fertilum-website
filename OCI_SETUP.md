# OCI Deployment Setup

## 1. Prepare OCI Ubuntu Instance

SSH into your OCI Ubuntu instance and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Create application directory
sudo mkdir -p /opt/fertilum
sudo chown $USER:$USER /opt/fertilum

# Create dist directory for static files
mkdir -p /opt/fertilum/dist
```

## 2. Configure Nginx

Create `/etc/nginx/sites-available/fertilum`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /opt/fertilum/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets for 1 year
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Disable caching for HTML files
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "public, must-revalidate, max-age=0";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/fertilum /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 3. Set Up GitHub Secrets

In your GitHub repo, go to **Settings → Secrets and variables → Actions** and add:

- `OCI_HOST` → Your OCI instance public IP (e.g., `123.45.67.89`)
- `OCI_USER` → Your Ubuntu username (e.g., `ubuntu`)
- `OCI_SSH_KEY` → Your private SSH key (the full key, including `-----BEGIN RSA PRIVATE KEY-----`)

To get your SSH key:

```bash
# On your local machine
cat ~/.ssh/id_rsa
```

Then copy the full output and paste it as the secret.

## 4. Test Deployment

Push a change to master:

```bash
git add .
git commit -m "Test deployment"
git push origin master
```

Watch the GitHub Actions run under the **Actions** tab in your repo.

## 5. Optional: Set Up SSL/HTTPS

Once everything works, set up free SSL with Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Troubleshooting

**Deployment fails with "Permission denied":**
- Check that your SSH key has the correct permissions: `chmod 600 ~/.ssh/id_rsa`
- Verify the public key is in `~/.ssh/authorized_keys` on the OCI instance

**Nginx not reloading:**
- Manually test: `sudo systemctl reload nginx`
- Check logs: `sudo tail -f /var/log/nginx/error.log`

**Site shows 404:**
- Verify files exist: `ls -la /opt/fertilum/dist/`
- Check Nginx config: `sudo nginx -t`
