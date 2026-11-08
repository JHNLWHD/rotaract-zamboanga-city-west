import { expect, it, vi } from 'vitest';
import { getDeployedRoutes } from './deployedRoutes';

it('does not restrict server builds or local draft previews', () => {
  expect(getDeployedRoutes()).toBeUndefined();
  const browserDocument = document;
  vi.stubGlobal('document', undefined);
  try {
    expect(getDeployedRoutes()).toBeUndefined();
  } finally {
    vi.stubGlobal('document', browserDocument);
  }
});

it('supports snapshots without a route list and an empty deployed archive', () => {
  const state = document.createElement('script');
  state.id = 'page-state';
  state.type = 'application/json';
  state.textContent = '{"queries":[]}';
  document.body.appendChild(state);
  try {
    expect(getDeployedRoutes()).toBeUndefined();
    state.textContent = '{"routes":[]}';
    expect(getDeployedRoutes()).toEqual(new Set());
  } finally {
    state.remove();
  }
});
