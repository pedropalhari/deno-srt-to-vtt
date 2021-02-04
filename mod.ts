const windowsDecoder = new TextDecoder("windows-1252");

/**
 * Converts an `ArrayBuffer` and returns an utf-8 string that represents a .vtt
 * subtitle.
 *
 * @param subArrayBuffer
 */
export function srtToVtt(subArrayBuffer: ArrayBuffer): string {
  let decodedText = windowsDecoder.decode(subArrayBuffer);

  let subLines = decodedText.split("\n");

  let sublinesWithoutIndexes = [];
  // A timestamp is always preceded by a index that must be removed
  for (let i = 0; i < subLines.length; i++) {
    let line = subLines[i];
    let nextLine = subLines[i + 1];

    if (nextLine && nextLine.includes("-->")) {
      // The next line is a timestamp, ignore this one
      continue;
    }

    if (line.includes("-->")) {
      // This line is a timestamp, replace ',' with '.'
      line = line.replaceAll(",", ".");
    }

    sublinesWithoutIndexes.push(line);
  }

  // Make the subtitle start with WEBVTT
  sublinesWithoutIndexes.unshift("WEBVTT\n");

  return sublinesWithoutIndexes.join("\n");
}
