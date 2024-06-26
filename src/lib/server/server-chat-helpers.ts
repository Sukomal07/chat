export function checkApiKey(
  apiKey: string | null | undefined,
  keyName: string
) {
  if (apiKey === null || apiKey === undefined || apiKey === "") {
    throw new Error(`${keyName} API Key not found`);
  }
}
