import { createContext, useContext, useEffect, useState } from 'react';

export const RenderTimeContext = createContext<number | undefined>(undefined);

// Hydrate the build's time-dependent labels, then update them to the visit time.
export function useRenderTime() {
  const snapshotTime = useContext(RenderTimeContext);
  const [now, setNow] = useState(snapshotTime ?? Date.now());
  useEffect(() => setNow(Date.now()), []);
  return now;
}
