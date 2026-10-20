// Browser refreshes must not advertise detail pages missing from this build.
// Server builds and local draft previews have no deployed route restriction.
export function getDeployedRoutes(): Set<string> | undefined {
  if (typeof document === 'undefined') return undefined;
  const snapshot = document.getElementById('page-state')?.textContent;
  const routes: string[] | undefined = snapshot
    ? JSON.parse(snapshot).routes
    : undefined;
  return routes ? new Set(routes) : undefined;
}
