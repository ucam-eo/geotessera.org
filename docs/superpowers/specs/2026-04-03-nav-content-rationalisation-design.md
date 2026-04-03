# Nav & Content Rationalisation

**Date:** 2026-04-03
**Status:** Proposed

## Problem

The site nav has grown to 9 items + 2 dropdowns + social icons, and the About page has become a kitchen-sink of 8 sections — several of which now duplicate content that has its own dedicated page (Projects, Docs links). With the habitat-mapping merge (PR #1) adding a Projects page and growing the people/funding/partners data, the information architecture needs rationalising.

## Design

### Nav: before and after

**Before (9 items + 2 dropdowns):**
About | Projects | Blog | Tasks | Papers | Videos | Coverage | Docs (dropdown) | Explore (dropdown)

**After (6 items + 1 dropdown):**
About | Projects | Blog | Papers | Videos | Getting Started | Explore (dropdown)

Changes:
- **Tasks** removed from nav — task examples move into Getting Started as a "What you can do with TESSERA" section
- **Coverage** removed from nav — folds into the Explore dropdown alongside the TEE viewers
- **Docs dropdown** removed — replaced by a full Getting Started page
- **Explore dropdown** expanded to include Coverage globe

### About page (slimmed)

Becomes focused on the team and mission. Sections:

1. **What is TESSERA?** — existing overview, unchanged
2. **Roadmap** — model versions and milestones (part of the project story)
3. **People** — faculty, researchers, collaborators (from `people.ts`)
4. **Funding** — funding sources (from `funding.ts`)
5. **Partner Institutions** — partner list (from `partners.ts`)
6. **Acknowledgments** — compute/data acknowledgments

**Removed from About:**
- Projects section (has its own `/projects` page; was already just showing first 5 with a "view all" link)
- Ecosystem section (repos, libraries, tools → moves to Getting Started)
- Get Involved section (request embeddings, contribute, cite, community → moves to Getting Started)

### Getting Started page (new)

Replaces the Docs dropdown with a real page at `/getting-started`. Combines:

1. **Ecosystem** — repos and libraries with install commands (`pip install geotessera`, R package, OCaml, TypeScript), maturity badges
2. **Tools & Resources** — TEE, examples repo, Claude skills, interactive notebook, Agribound, Colab pipeline, documentation links (readthedocs, TEE user guide)
3. **What you can do** — current task examples (land cover, solar panel detection, crop type, etc.) migrated from `/tasks`. Preserves the tag-based browsing and individual task detail pages, but entry point moves here
4. **Get Involved** — request embeddings, contribute, cite TESSERA, join Zulip community, report issues

### Explore dropdown (expanded)

Adds Coverage globe alongside existing TEE entries:

- **TEE Hosted** — tee.cl.cam.ac.uk (full viewer)
- **TEE Browser** — tze.geotessera.org (lightweight)
- **Coverage Globe** — current `/coverage` page (3D globe showing embedding availability)

### Routing changes

| Old route | New route | Notes |
|---|---|---|
| `/tasks` | `/getting-started` | Tasks listing moves into Getting Started |
| `/tasks/:tag` | `/getting-started#tasks` or keep `/tasks/:tag` | Tag filtering could stay as sub-routes |
| `/tasks/:tag/:slug` | Keep as-is | Individual task examples keep their URLs |
| `/coverage` | Keep as-is | Page stays, just moves in nav from top-level to Explore dropdown |
| — | `/getting-started` | New page |

**URL compatibility:** The `/tasks` and `/tasks/:tag/:slug` routes should continue to work (redirect or alias) so existing links don't break.

### Files affected

- `src/components/Nav.svelte` — remove Tasks, Coverage, Docs dropdown; add Getting Started; expand Explore dropdown
- `src/pages/About.svelte` — remove Projects, Ecosystem, Get Involved sections
- `src/pages/GettingStarted.svelte` — new page combining ecosystem + tools + tasks + get involved
- `src/App.svelte` — add Getting Started route
- `src/lib/router.ts` — add `/getting-started` route, keep `/tasks` routes working
- `src/lib/data/people.ts` — no changes (already unified)

### What stays unchanged

- Projects page and all project detail pages
- Blog page and all blog post pages
- Papers page
- Videos page
- Coverage page (just moves in nav)
- Home page
- All data files (`people.ts`, `projects.ts`, `funding.ts`, `partners.ts`)
- Person resolution for blog authors (just implemented)

## Out of scope

- Redesigning any individual page's visual layout
- Changing the home page scroll story
- Restructuring the data model
- Mobile nav redesign (the hamburger menu benefits automatically from fewer items)
