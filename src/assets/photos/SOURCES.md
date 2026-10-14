# Photography used across the site

Placeholder photography. None of these were taken at Paradise: they are openly licensed
stand-ins, chosen so the layouts can be judged with real pictures in them. Replace them with
the school's own photographs before launch (see "Replacing a photo" below).

Every file here is public domain or CC0: free for commercial use, no attribution required.
Each was downloaded from the source below at a watermark-free size and re-encoded to WebP.

| File                     | Shows                                         | Licence                     | Source |
| ------------------------ | --------------------------------------------- | --------------------------- | ------ |
| `reading-together.webp`  | Two children sharing a book in evening light  | CC0                         | StockSnap, Ben White: https://stocksnap.io/photo/sunlight-sunshine-XDNPCSL1U2 |
| `drawing-table.webp`     | A girl drawing at a table                     | CC0                         | StockSnap, Direct Media: https://stocksnap.io/photo/child-homework-GV5GIEXDBA |
| `running-path.webp`      | Children running up a red-earth path          | CC0                         | StockSnap, Seth Doyle: https://stocksnap.io/photo/children-happy-T2SO7MDTYS |
| `quiet-reading.webp`     | A boy reading the Quran in class              | Public Domain Mark 1.0      | UNSOM on Flickr: https://www.flickr.com/photos/unsom/18178961554/ |
| `running-grass.webp` | Out on the grass | CC0 | StockSnap, Family Moments: https://stocksnap.io/photo/kids-playing-MQJR2N5ZH2 |
| `with-teacher.webp` | One to one | CC0 | StockSnap, Peter Hershey: https://stocksnap.io/photo/people-kid-PXRK3Z59YR |
| `swings.webp` | On the swings | CC0 | StockSnap, Family Moments: https://stocksnap.io/photo/playground-child-GKN827HJAJ |
| `blocks.webp` | Building blocks | CC0 | StockSnap, Birch Landing Home: https://stocksnap.io/photo/children-toys-R8U6CVZ24Q |
| `colouring.webp` | Colouring in | CC0 | StockSnap, Freestocks.org: https://stocksnap.io/photo/kid-child-34LMI1479H |
| `two-friends.webp` | Two friends | CC0 | StockSnap, Ashton Bingham: https://stocksnap.io/photo/people-kid-0ZI3S44P8A |
| `alphabet.webp` | Letters first | CC0 | StockSnap, Olu Eletu: https://stocksnap.io/photo/alphabeth-abc-Q5FJUK9OFH |
| `bookshelf.webp` | The reading shelf | CC0 | StockSnap, Josh Felise: https://stocksnap.io/photo/library-books-4TDHSPIMJ6 |
| `writing-hands.webp` | Pencil work | CC0 | StockSnap, Martin Vorel: https://stocksnap.io/photo/child-kid-X6077HDEQH |
| `fountain.webp` | Splash | CC0 | StockSnap, frank mckenna: https://stocksnap.io/photo/water-fountain-KQJSTQHS3S |
| `on-the-ground.webp` | Small discoveries | CC0 | StockSnap, Mi PHAM: https://stocksnap.io/photo/people-girl-VZ396K733H |
| `high-swing.webp` | As high as it goes | CC0 | StockSnap, Noah Silliman: https://stocksnap.io/photo/people-kid-KVJOVBQQOA |
| `by-the-water.webp` | Side by side | CC0 | StockSnap, Kristin Hardwick: https://stocksnap.io/photo/sisters-children-C3JWZLBWXS |

## Where they are used

- Home page sections: `src/data/media.ts`
- Gallery page and the home page collage: `src/data/gallery.ts`
- News stories: `src/data/news.ts`
- Bundled events: `src/lib/content.ts`

## Replacing a photo

Drop the new file in this folder, point the import at it in the files above, and update the
`width`, `height`, `alt` and caption beside it. Photos published through Sanity Studio replace
the gallery, news and events pictures on their own and need no code change.
