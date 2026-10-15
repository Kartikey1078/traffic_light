# Traffic Light (Interview Version)

Simple React traffic light with Start / Stop / Reset.

## Run

```bash
npm install
npm run dev
```

## How it works

1. `lights` config holds name, color, and duration (seconds).
2. `useState` stores active light index, running flag, and countdown.
3. `useEffect` starts `setInterval` (countdown) and `setTimeout` (next light).
4. Cleanup with `clearInterval` / `clearTimeout` stops duplicate timers.
