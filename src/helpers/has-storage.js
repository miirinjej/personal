export default function hasStorage() {
  try {
    return 'localStorage' in globalThis && globalThis.localStorage !== null;
  } catch {
    return false;
  }
}
