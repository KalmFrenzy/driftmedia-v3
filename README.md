# Drift Media Website

Next.js implementation of the supplied Drift Media landing page + Selected Projects page.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Showreel

The hero on **both** the home page and `/projects` is designed to play a looping, muted showreel.

Add the real Drift Media showreel here:

```text
public/showreel.mp4
```

The site uses that file automatically. Until it is added, the hero falls back to the poster image so the layout still works.

For best performance, export the showreel as a compressed H.264 MP4, ideally 1920px wide or smaller and short enough to keep the page light.

## Content / links

Edit `app/site-data.js`:

- `instagram`: Instagram profile
- `youtubeChannel`: YouTube channel
- `youtubeVideoId`: a real video ID from the Drift Media YouTube channel. This is used by the project-video modal.
- `showreelSrc`: showreel file path; defaults to `/showreel.mp4`
- `whatsapp`: WhatsApp number in international format without `+`
- `phones`: footer phone numbers; clicking copies them
- `email`: footer email; clicking copies it

Replace the Unsplash images in `site-data.js` with Drift Media's actual project/service images before launch.

## Interactions included

- Hero showreel on home and project pages
- Animated hero words: Ads / Events / Films / Content
- Moving client logo marquee
- Statistics count from zero when they enter the viewport
- Sticky Apple-style blurred navigation on scroll
- Home service rows show a preview image + View Projects CTA on hover
- Project rows become `#fafafa` on hover
- Project page uses a one-open-at-a-time accordion; Commercial is open by default
- Opening one project category closes the previous one
- Project category cards open a YouTube playback modal
- Phone/email click-to-copy notifications
- Instagram and YouTube footer links point to Drift Media's profiles
- Contact CTA + footer close the viewport on both pages

## Project page

Open `/projects`.

The home-page service CTAs link to `/projects#commercial`, `/projects#events`, etc. The project page reads the hash and opens the requested category automatically.

The older `/projects/[category]` paths redirect to `/projects` so they remain safe if you have links to them.

## Vercel + Hostinger

Deploy this project to Vercel. Then add the Hostinger domain in Vercel → Project → Settings → Domains. Vercel will provide the DNS records for that exact project/domain. Add those records in Hostinger's DNS manager.

You do not need Hostinger web hosting if Vercel is hosting the Next.js application. Hostinger can simply remain the domain registrar/DNS provider.
