# UI-2

Quick start

[Install bun](https://bun.sh/docs/installation) if you havent already then from root  
`bun install`  
`bun run dev`

## Architectural overview

### Target audience

This product was created for an internal audience, not public web / customers. The core functionality are:

- Fast load time
- Robustness with dependency on network (other than for latest images)
- Good state management between the parts of the application, e.g. we assume that the user wants to jump between pages and products a lot.
- Deep-linking  
  We assume that product owners want to send deep-links to others with filters included

### Design choices

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

- public  
  This is your vite public folder where fonts and images are stored
- src  
  application source, including unit test files ending with .spec.ts
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

## Test status
