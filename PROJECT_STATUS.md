# COP Angel website project

Updated: 9 November 2026

## Current position

- Repository: COP-Angel/copangel-website (private).
- Live website currently hosted on Squarespace, as confirmed by Richard.
- Imported the previously generated homepage package with the official logo, version dated 4 November 2026. This is the saved prototype; it has not been compared against the current Squarespace page.
- Richard prefers to continue on the free plan.

## Files

- `index.html`: standalone homepage with embedded logo imagery and inline styles and scripts. Open directly in a browser for local review.
- `copangel-logo.png`: official logo supplied with the homepage package.
- `squarespace-code-block.html`: retained Squarespace embed version.

## Existing behaviour

- Responsive navigation and enquiry modal are implemented.
- The enquiry form validates fields and prepares a message in the visitor's email application. The visitor must send it to complete the enquiry; the website does not store form data.
- The homepage contains prototype content and illustrative dashboard values.

## Development update — 9 November 2026

- Agreed direction: a concise single-page site focused on homeowner product interest and investor prospectus interest as manufacturing approaches.
- Updated the main navigation to Technology, For homeowners, Our progress, Investors and Contact. All links target real sections, with sticky-header offsets.
- Added separate homeowner and investor calls to action and tailored enquiry dialog text.
- Removed the empty software screenshot section and the old placeholder instruction in the hero.
- Extracted JavaScript into `site.js`; kept the official logo as a local asset.
- Replaced the local-download demo with email enquiry preparation. Visitors must send their email; no automatic lead database or email service is connected. Product-update opt-in is optional.
- Browser checked the homeowner and investor enquiry dialogs and navigation. Static checks cover anchor targets, assets and JavaScript syntax. No message was sent during verification.
- Hosting target is GitHub Pages. GitHub Free requires a public repository; current repository remains private pending Richard's decision. No Pages deployment is live yet.
- Keep Squarespace serving the live domain until the replacement is complete, forms are ready and GoDaddy DNS has been switched and verified. Archive/remove the old Squarespace embed afterwards.

## Next steps

1. Review the imported homepage and compare it with the current Squarespace site.
2. Resolve repository visibility for free GitHub Pages and activate Pages from `main` / repository root. `.nojekyll` is included. Publish only the website assets; keep the Squarespace embed as an archive.
3. Confirm content, connect a real enquiry service and add the applicable privacy information before launch.
4. Review the finished preview before changing the live domain or Squarespace hosting.

## Continuity

Keep this file updated with decisions, completed work and outstanding tasks so a future chat can resume from the repository.

## Homepage review — 9 November 2026

Added installation details from the existing public site: replacement radiator valves and underfloor actuators, wireless connection to the heat pump control box. Added a concise team experience message in the investor section. Kept savings claims qualitative pending evidence for specific percentages. Current enquiry mechanism remains email preparation; a hosted form service is still needed for automatic capture before launch.
