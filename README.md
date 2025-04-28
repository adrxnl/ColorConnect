# ColorConnect

ColorConnect is an accessibility-focused web application designed to support individuals with color vision deficiency (color blindness). It offers interactive visual tools, personalized filters, color-blindness tests, and educational features through a clean and responsive user interface.

This project also incorporates CI/CD using GitHub Actions to automate testing and deployment workflows.

---

## Project Structure

- `.github/workflows/` – GitHub Actions CI/CD workflows
- `.idea/` – Project-specific settings for JetBrains IDEs
- `Timeline Images/` – Assets used in the timeline feature
- `plates/` – Additional assets or templates
- `.DS_Store` – macOS system file
- `ArtExplorer.css` – Stylesheet for the Art Explorer page
- `ArtExplorer.html` – HTML structure for the Art Explorer page
- `ArtExplorer.js` – JavaScript functionality for the Art Explorer page
- `ArtMap.css` – Stylesheet for the Art Map page
- `ArtMap.html` – HTML structure for the Art Map page
- `ArtMap.js` – JavaScript functionality for the Art Map page
- `ArtTimeline.css` – Stylesheet for the Art Timeline page
- `ArtTimeline.html` – HTML structure for the Art Timeline page
- `ArtTimeline.js` – JavaScript functionality for the Art Timeline page
- `CC logo.png` – Logo image for ColorConnect
- `CNAME` – Custom domain configuration for Netlify
- `LogIn.html` – Login page for user authentication
- `Profile.html` – User profile page
- `Profile.js` – JavaScript functionality for the profile page
- `README.md` – Project documentation
- `backgroundtest.webp` – Background image asset
- `conversion.html` – Page for color conversion features
- `conversion.js` – JavaScript functionality for the conversion page
- `conversionstyle.css` – Stylesheet for the conversion page
- `gallery.html` – Gallery page showcasing artwork
- `gallery.js` – JavaScript functionality for the gallery page
- `game.html` – Main game interface
- `index.html` – Landing page of the application
- `lock_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg` – Lock icon SVG
- `mail_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg` – Mail icon SVG

---

## Prerequisites

Ensure you have a modern web browser installed (e.g., Chrome, Firefox, Edge).

---

## Installation

Clone the repository and change into the project directory:

```bash
git clone https://github.com/adrxnl/ColorConnect.git
cd ColorConnect
```

---

## Running the Application

Open `index.html` in a web browser:

```bash
# On Mac/Linux
open index.html

# On Windows
start index.html
```

Alternatively, manually double-click on `index.html` to open it in your default browser.

---

## CI/CD Pipeline

This project uses GitHub Actions for Continuous Integration and Deployment. The workflows are defined in `.github/workflows/` and include:

- **CI Workflow:** Runs build and checks on every push to the `main` branch.
- **CD Workflow:** Deploys the application to **Netlify** automatically after a successful CI run.

Deployment is managed through Netlify, and the site is updated with each successful push to the `main` branch.
