import pako from 'pako'

export function deflate(raw: any): string {
  const rawParams = JSON.stringify(raw)
  const compressedData = pako.deflate(rawParams)

  return btoa(String.fromCharCode.apply(null, compressedData as any))
}

export function inflate(base64Data: any): any {
  const decodedData = atob(base64Data)
  const uint8array = new Uint8Array(decodedData.length)
  for (let i = 0; i < decodedData.length; i++)
    uint8array[i] = decodedData.charCodeAt(i)

  return JSON.parse(pako.inflate(uint8array, { to: 'string' }))
}
