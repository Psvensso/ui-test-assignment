[![Build](https://github.com/Psvensso/ui-test-assignment/actions/workflows/pages.yml/badge.svg?label=build)](https://github.com/Psvensso/ui-test-assignment/actions)

# UI-2

Quick start

[Install bun](https://bun.sh/docs/installation) if you havent already then from root  
`bun install`  
`bun run dev`

## Architectural overview

### Changes from original design

The app has one distinct difference from the initial design.

The initial design showed a "Search" auto-complete selector above the data table. But rendering a autocomplete selector on top of a full table showing the same data is just confusing and provide low value. Form items above a data list are much more expected to actually filter that data.

However - the "Search/Quick open" component is a good idea and has instead been added to the header component with the same functionality as the "Search" in the design sketches showed. And the "Search" has been implemented as a filter for the data table/list.

### Target audience

This product was created for an internal audience, not public web / customers. The core functionality are:

- Fast load time
- Robustness with dependency on network (other than for latest images)
- Good state management between the parts of the application, e.g. we assume that the user wants to jump between pages and products a lot.
- Deep-linking  
  We assume that product owners want to send deep-links to others with filters included

### Technical Design choices

#### Data scale

We don't expect the products data to grow beyond capabilities of this app, this app should be able to handle at least 10x the amount of json data, images chatter would be the only limit there and some form of image maps would be needed to limit the amount of network calls needed. Since the data of the current endpoint is only around 300kb the decision was made to wait for and download the entire set of data before rendering the app, this does over-fetches some json so if this becomes a problem in the future a backend-for-frontend solution should be added to filter some of the data from the UI api and lazy load the other data when.

#### Serving hot data

The decision was make to load json and images from the server instead of building the entire app as static as self-host, this add some risk where the external api could alter the contract and hence the app could fail if its a breaking change however we don't want to cache and serve up stale data.

Serving both images and data hot means that we leverage timing of the cache coming from the server heavily (file cache in the browser).
This was the main reason not to go for something like Next.js in this application, the browser will do the heavy lifting for us here and we should get up to date data and images fast.

#### Page params instead of routes

One of the requirements were to be able to maintain view states and sending deep-links with filters intact. The decision was there for made to keep some UI state in the search parameters of the browser. This could be further tweaked to allow for better/different browser back/forward history behavior if wanted.

#### Memory usage

This application was primarily created for newer end phones and tablets or desktops, therefor, to keep scroll state and speed the views are kept in the DOM, this provides better UX at some cost on memory. At this point its a minimal amount but for scale, this would have to be refactored into standalone GC able pages and scroll/UI state preserved somewhere else.

## File structure

This project is a single folder bun and vite based project, e.g. no Workspace/Monorepo. If this project grows much beyond this size a Workspace/Monorepo should be considered.

- public/  
  This is your vite public folder where fonts and images are stored
- src/
  - root - Root holds the global context with our data fetch and data prepare
    application source, including unit test files ending with .test.ts
  - assets/  
    this is vite's static assets folder, mainly fonts and favicon
  - components/  
    re-usable components and some layout components that uses the root context
  - pages/  
    We went for pages (as opposed to views), but there is only one page for now. This is the main structure components of the app.
  - utils/  
    consts, theming and utility functions
- tests  
  E2E Playwright test folder

## Tech stack

- TypeScript
- React 19
- [AntD Components](https://ant.design/components/overview/)  
  We can se that UI.com inherits a lot from the MUI library, since this project had a very limited time-frame, we did not have access to the internal frameworks or design libraries and we needed virtual components the decision was made to use Ant design instead of Chakra or MUI. With more time available Chakra only would have been advices for more control.

- [Emotion styled](https://emotion.sh/docs/styled)  
  For css-in-js we use Emotion with the styled syntax, no css prop allowed in teh JSX.

- [Box from Chakra factory](https://chakra-ui.com/docs/styling/chakra-factory)  
  Please dont confuse the usage of Chakra Factory with the pre-made Chakra components. This app Dont use the Chakra Components, only the utility classes that works in combination with Emotion.

## Test

### Unit

We use vitest with @testing-library/react, Vitest extension for VSCode is recommended or just run with `bun run test`. Can also run with coverage.

#### Status

We absolutely need more unit tests but the @testing-library/react package in combination with React 19 and Vite have had some tough releases lately and the even loop is tricky. Especially read the [user-event issue](https://github.com/testing-library/user-event/issues/1115) discussed here before starting with more testing.

### E2E

We use Playwright for E2e with PO pattern. Since we went for pages for the naming convention for the app "views" we also went for a PO pattern for the e2e even if its probably an over engineering here. Leaving some space to grow.

#### Status

These have been tested manually but should be automated

Todo:

- More params testing needed
- List needs more testing
- More responsive testing, lists should work on mobile etc.
- Testing on faulty json structures
