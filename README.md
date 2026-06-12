# Video Capture

A single-page React application that accesses the user's camera via the WebRTC `getUserMedia` API and automatically captures a photo after a 5-second countdown.

## Tech stack

- React 19 + TypeScript
- Vite
- Plain CSS

## Getting started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How it works

1. Click **Start** — the browser will ask for camera permission.
2. A live preview appears with a 5-second countdown.
3. The snapshot is captured automatically and displayed below.

## Tests

```bash
npm test
```

The camera hook is covered with unit tests for both the granted and denied
access paths, with `getUserMedia` mocked.

## Notes

- Storybook and E2E tests were considered out of scope for this small assignment.