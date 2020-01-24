import { newE2EPage } from '@stencil/core/testing';

describe('zea-tree-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zea-tree-view></zea-tree-view>');

    const element = await page.find('zea-tree-view');
    expect(element).toHaveClass('hydrated');
  });
});
