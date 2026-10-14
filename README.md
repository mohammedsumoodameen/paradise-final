# Paradise Junior School — "Journey" design

The Paradise website rebuilt on the layout language of an international-school site
(https://www.icsz.ch/): rounded "squircle" media, heavy uppercase headings with one word picked
out in orange, tile grids, a coloured step-by-step band and a dark footer.

All words, photographs, branches, news and forms come from `~/Desktop/paradise-frontend`, which
was only read, never changed. Nothing about the school was invented.

React 19 + Vite + TypeScript + React Router 7, plain CSS.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 (also serves api/submit.ts, so the forms work)
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist on http://localhost:4173 (no API: forms will not send)
```

Use ports 5173 / 4173: they are the local origins Sanity's CORS list allows. On any other port
the site falls back to the copy bundled in `src/data`.

`.env` holds the Sanity project id and the server-side `SANITY_WRITE_TOKEN` the forms need
(copied from paradise-frontend; see `.env.example`).

## Where things live

```
api/submit.ts            Vercel function every form posts to (unchanged from paradise-frontend)
src/data/                all bundled copy and content (unchanged)        ← edit words here
src/lib/                 Sanity queries and the form sender (unchanged)
src/styles/base.css      colours, fonts, radii, buttons, cards            ← edit the look here
src/styles/shell.css     header, menu, Enquire tab, footer
src/styles/home.css      the home page sections
src/styles/pages.css     inner pages and forms
src/components/ui.tsx    Heading, ArrowLink, Reveal, Modal, icons
src/components/page.tsx  PageHead, StepsBand, Offers, ContactCard
src/components/EnquiryForm.tsx + forms.ts   one form engine, four field lists
src/home/                the nine home page sections, one file each
src/pages/               one file per route
```

Field names in `src/components/forms.ts` must stay in step with the `FORMS` table in `api/submit.ts`.

## How the reference maps onto Paradise

| Reference section            | Here                                                      |
| ---------------------------- | --------------------------------------------------------- |
| Film with centre badge       | The school film, badge reads "A pleasant life begins here" |
| "Welcome to the journey"     | Hero headline, Plan a Visit                               |
| Mission / Vision / Values    | Our philosophy: the four ways a child grows               |
| Three stage cards            | Four stages, Play Group to Middle, each opening a popup   |
| Stat tiles + photo + roundel | The six values as tiles                                   |
| Coloured pillar slider       | The four admission steps                                  |
| "Our kind of" photo slider   | Life at school photographs                                |
| Testimonials                 | In parents' words                                         |
| News tabs                    | Latest / Events / Community                               |

## Before going live

- The photographs are the openly licensed placeholders from paradise-frontend
  (`src/assets/photos/SOURCES.md` there). Replace them with the school's own.
- Branches, FAQs and the selected-teachers list are still the sample data flagged in `src/data`.
- `STATS` in `src/data/site.ts` is marked as placeholder there, so it is not shown anywhere.
- Social and legal links are hidden until they are given real addresses in `LINKS` / `SOCIALS`.
