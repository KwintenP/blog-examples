import { AngularCliDemoPage } from './app.po';

describe('angular-cli-demo App', () => {
  let page: AngularCliDemoPage;

  beforeEach(() => {
    page = new AngularCliDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
