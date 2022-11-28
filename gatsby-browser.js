export { wrapRootElement } from './src/apollo/wrapper'

export function onRouteUpdate({ location }) {
  // responsible for smooth-scrolling to hashes on page refreshes
    window.scroll(0, 0)
}
