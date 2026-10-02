import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Botpress embed contract', () => {
  it('keeps the verified club chatbot configured in the production document', () => {
    const html = readFileSync(path.resolve('index.html'), 'utf8');

    expect(html).toContain('https://cdn.botpress.cloud/webchat/v3.0/inject.js');
    expect(html).toContain('window.botpress.init({');
    expect(html).toMatch(/botId:\s*'[0-9a-f-]+'/);
    expect(html).toMatch(/clientId:\s*'[0-9a-f-]+'/);
    expect(html).toContain("botName: 'Ask the club'");
  });
});
