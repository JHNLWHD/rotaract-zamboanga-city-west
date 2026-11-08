import { beforeEach, expect, it, vi } from 'vitest';
const { getEntries } = vi.hoisted(() => ({ getEntries: vi.fn() }));
vi.mock('./contentfulClient', () => ({ default: { client: { getEntries } } }));
import { getAllEntries } from './getAllEntries';

beforeEach(() => getEntries.mockReset());

it('loads every page while preserving the query and its order', async () => {
  getEntries
    .mockResolvedValueOnce({ total: 3, items: [{ id: 1 }, { id: 2 }] })
    .mockResolvedValueOnce({ total: 3, items: [{ id: 3 }] });
  const query = { content_type: 'project', order: '-fields.date' };
  expect((await getAllEntries(query)).items).toEqual([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  expect(getEntries).toHaveBeenLastCalledWith({ ...query, skip: 2 });
});

it('preserves an explicit homepage limit', async () => {
  getEntries.mockResolvedValue({ total: 20, items: [{ id: 1 }] });
  expect(
    (await getAllEntries({ content_type: 'project', limit: 1 })).items
  ).toHaveLength(1);
  expect(getEntries).toHaveBeenCalledOnce();
});

it('fails instead of publishing a truncated collection', async () => {
  getEntries
    .mockResolvedValueOnce({ total: 2, items: [{ id: 1 }] })
    .mockResolvedValueOnce({ total: 2, items: [] });
  await expect(getAllEntries({ content_type: 'project' })).rejects.toThrow(
    'incomplete collection'
  );
});
