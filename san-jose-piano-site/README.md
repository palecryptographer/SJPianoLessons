# San Jose Piano Lessons site

This is a dependency-free static site. Each page keeps its semantic HTML in one file and loads the shared stylesheets in this order:

1. `assets/css/base.css` — design tokens, normalization, typography, and shared utilities.
2. `assets/css/layout.css` — navigation, hero, section, footer, and page structure.
3. `assets/css/components.css` — buttons, cards, galleries, forms, video previews, and content patterns.
4. `assets/css/responsive.css` — the five responsive viewport classes used by the site.

The gallery uses the small progressive-enhancement script in `assets/js/site.js`. Images are grouped under `assets/images/gallery/` and `assets/images/supporting/`. No build step or package installation is required.

The visual system is intentionally shared across every route: `--max` and `--gutter` control the usable page width, the type scale and spacing tokens live in `base.css`, and the component styles define consistent buttons, cards, split layouts, testimonials, accordions, forms, and conversion sections. The responsive stylesheet is organized around mobile, large mobile, tablet, small desktop, and desktop behavior so layouts recompose instead of simply shrinking.

## Entry points

- `index.html` — primary landing page
- `booking.html` — Acuity scheduler and contact fallback
- `testimonials.html` — full migrated testimonial collection
- `gallery.html` — local recital and student image gallery
- `what-we-teach.html` — classical, jazz, pop, and theory content
- `where-we-teach.html` — in-home, instructor-home, service-area, and online options
- `our-teachers.html` — teacher profile and teaching philosophy
- `video-lessons.html` — migrated YouTube tutorial library

The booking page preserves the legacy Acuity owner ID and legacy contact-form endpoint. Confirm both providers before production deployment.
