/**
 * Convert raw PCM data (L16) into a WAV container buffer.
 *
 * @param pcmData - Raw PCM audio as ArrayBuffer (16-bit signed)
 * @param sampleRate - Sampling rate in Hz (default 24000)
 * @param numChannels - Number of audio channels (default 1)
 * @returns ArrayBuffer containing a valid WAV file
 */
export function pcmToWav(
  pcmData: ArrayBuffer,
  sampleRate: number = 24000,
  numChannels: number = 1
): ArrayBuffer {
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;

  const buffer = new ArrayBuffer(44 + pcmData.byteLength);
  const view = new DataView(buffer);

  // Helper to write ASCII strings
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // ---- WAV Header ----
  writeString(0, "RIFF");
  view.setUint32(4, 36 + pcmData.byteLength, true);
  writeString(8, "WAVE");

  // fmt chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat = 1 (PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true); // BitsPerSample

  // data chunk
  writeString(36, "data");
  view.setUint32(40, pcmData.byteLength, true);

  // PCM samples
  new Uint8Array(buffer, 44).set(new Uint8Array(pcmData));

  return buffer;
}



/**
 * Convert base64 PCM audio (L16) into a playable WAV Blob URL.
 */
export function base64PcmToWavUrl(
  base64: string,
  sampleRate: number = 24000,
  numChannels: number = 1
): string {
  const binary = atob(base64);
  const pcmArray = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    pcmArray[i] = binary.charCodeAt(i);
  }

  const wavBuffer = pcmToWav(pcmArray.buffer, sampleRate, numChannels);
  const blob = new Blob([wavBuffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}
