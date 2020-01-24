import { newE2EPage } from '@stencil/core/testing';

describe('zea-tree-item-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zea-tree-item-element></zea-tree-item-element>');

    const element = await page.find('zea-tree-item-element');
    expect(element).toHaveClass('hydrated');
  });
});
