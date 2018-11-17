export default function createApp(name, extra) {
  return {
    name,
    routing: {},
    store: null,
    ...extra,
  }
}
