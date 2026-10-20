import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Label } from './label';

it('keeps the native label association, styling and forwarded ref', async () => {
  const ref = createRef<HTMLLabelElement>();
  render(
    <>
      <Label htmlFor="name" ref={ref} className="custom">
        Full name
      </Label>
      <input id="name" />
    </>
  );
  expect(ref.current).toHaveClass('custom');
  await userEvent.setup().click(screen.getByText('Full name'));
  expect(screen.getByLabelText('Full name')).toHaveFocus();
});
