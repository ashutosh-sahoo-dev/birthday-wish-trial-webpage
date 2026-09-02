# Maanisha — The Birthday Issue 🌊🌸

A mobile-first interactive birthday magazine made with **only HTML, CSS and JavaScript**.

## Run locally

Just open `index.html` in a browser.

## Deploy on GitHub Pages

1. Create a new GitHub repository, e.g. `birthday-magazine`.
2. Put all files/folders in the repository.
3. Push to the `main` branch.
4. Go to **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.
8. GitHub will provide the public Pages URL.

No backend, database or server is required.

## Customize

### 1. Secret password
Open `script.js` and change:

```js
const SECRET_WORD = "dahibara";
```

### 2. Your actual notes
The four notes are near the top of `script.js` in the `letters` object. Replace them with your own words.

### 3. Photos
Replace the files in `assets/` while keeping the same filenames, or update the image paths in `index.html`.

### 4. Music
If you have music you are allowed to use, name it:

`assets/ambient.mp3`

The sound button will then play it. Browsers require a user interaction before audio can start.

## Photo tips

For a faster GitHub Pages site, compress large phone photos before uploading. WebP/JPEG around 100–500 KB each is a good target.

## Design concept

Editorial magazine × ocean/coastal diary × flowers × personal letters × playful archive.
