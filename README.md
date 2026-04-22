# Fertilum Website V2

Corporate website for Fertilum — built with **Astro** for speed and simplicity.

## Features

- ✅ **Astro static site** — Ultra-fast, minimal JavaScript
- ✅ **V2 Editorial Design** — Beautiful, type-led homepage
- ✅ **EN/SV Bilingual** — English and Swedish copy
- ✅ **Responsive** — Mobile-first design
- ✅ **CI/CD Ready** — GitHub Actions → OCI deployment

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/
│   └── index.astro          # Homepage
├── components/
│   ├── Nav.astro            # Navigation
│   ├── Hero.astro           # Hero section
│   ├── SplitEntry.astro     # Entry cards
│   ├── Product.astro        # Product section
│   ├── Supplements.astro    # Supplements
│   ├── Science.astro        # Research papers
│   ├── CTA.astro            # Call-to-action
│   ├── Footer.astro         # Footer
│   ├── Button.astro         # Reusable button
│   ├── Icon.astro           # SVG icons
│   ├── Chip.astro           # Tag component
│   └── Placeholder.astro    # Image placeholders
├── layouts/
│   └── BaseLayout.astro     # HTML wrapper
└── lib/
    ├── tokens.ts            # Design tokens
    └── copy.ts              # Copy (EN/SV)
```

## Deployment

See [OCI_SETUP.md](./OCI_SETUP.md) for full instructions.

**TL;DR:**
1. Set up OCI instance (Node.js + Nginx)
2. Add GitHub secrets (`OCI_HOST`, `OCI_USER`, `OCI_SSH_KEY`)
3. Push to master → auto-deploys via GitHub Actions

## Styling

All styling is **inline CSS-in-JS** within Astro components. Design tokens (colors, spacing, radii) come from `src/lib/tokens.ts`.

## Language Switching

Copy is organized by language in `src/lib/copy.ts`:
- `COPY.en` — English
- `COPY.sv` — Swedish

Components accept a `lang` prop to switch language.

## Next Steps

- [ ] Add contact form + email integration
- [ ] Add blog/articles section (Markdown)
- [ ] Set up SSL/HTTPS on OCI
- [ ] Add analytics
- [ ] Fine-tune CSS units and spacing

---

Built with ❤️ using Astro
