import { srtToVtt } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.85.0/testing/asserts.ts";

Deno.test("Make sure the output matches", async () => {
  let srtSub = await Deno.readFile("./subs/hellraiser.srt");
  let vttSubGenerated = srtToVtt(srtSub);

  await Deno.writeTextFileSync("./subs/converted.vtt", vttSubGenerated);

  let vttSub = await Deno.readTextFileSync("./subs/hellraiser.vtt");

  assertEquals(vttSubGenerated, vttSub);
});
