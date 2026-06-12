# Video Capture

A single-page React application that accesses the user's camera via the WebRTC `getUserMedia` API and automatically captures a photo after a 5-second countdown.

## Demo

<!-- Demo recording -->

https://github.com/TODO_REPLACE/assets/demo.mp4


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

> Camera access requires a secure context. `localhost` is treated as secure, so it works out of the box during development. To test from another device, serve the app over HTTPS (e.g. a tunnel such as [ngrok](https://ngrok.com)).

## Browser support

Works in any modern browser that supports `getUserMedia` (Chrome, Firefox, Safari, Edge).

## How it works

1. Click **Start** — the browser will ask for camera permission.
2. A live preview appears with a 5-second countdown.
3. The snapshot is captured automatically and displayed below.

## Tests

```bash
npm test
```

Unit tests cover the camera hook (granted and denied access, with `getUserMedia`
mocked) and the camera utilities (error message mapping and frame capture).

## Notes

- Storybook and E2E tests were considered out of scope for this small assignment.