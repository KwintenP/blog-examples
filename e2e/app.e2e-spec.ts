import { BlogExamplesPage } from './app.po';

describe('blog-examples App', function() {
  let page: BlogExamplesPage;

  beforeEach(() => {
    page = new BlogExamplesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
