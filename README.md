# Deno srt-to-vtt

There's a very useful library for node that converts `.srt` subtitles to `.vtt` ones. This is my Deno version of it. Not copied from the node, just inspired by the existence of it.

No dependencies, obviously.

## Installation & usage

```typescript
import { srtToVtt } from "https://deno.land/x/deno_srt_to_vtt@0.3/mod.ts";

let srtSub = await Deno.readFile("SUB.srt");
let vttSubGenerated = srtToVtt(srtSub);

console.log({ vttSubGenerated });
```

## Findings

One of the things I'm mostly pissed about is also that I couldn't find a good resource on making this conversion (you know, those little details that bite your ass at the end of the day). So I'm listing most here.

- `.srt` is mostly `Windows 1252` encoding, you should consider this before doing any text parsing.
- "," at `.srt` subtitles timestamps should be converted to ".".
- Timestamps _may_ be out of order on `.srt`, you should order them.
- You should remove the indexes before the timestamp on `.srt`.
- The first line of `.vtt` should be `"WEBVTT\n"`.

I hope this list will grow as I figure out issues.
