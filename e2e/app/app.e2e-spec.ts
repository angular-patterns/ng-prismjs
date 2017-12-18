import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getParagraphText() {
    return element(by.css('sa-app-root h1')).getText();
  }
}

describe('App', () => {
    let page: AppPage;
    beforeEach(() => {
      page = new AppPage();
    });
    it('should display welcome message', () => {
      page.navigateTo();
      expect(page.getParagraphText()).toEqual('Hello World!');
    });
  });
