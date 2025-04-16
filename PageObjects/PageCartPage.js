class pageCartPage {
  constructor(page) {
    this.page = page;
    //Define XPath as properties here
    this.buttonViewCart = 'xpath=//span[text()="View Cart"]';
    this.assertionEmptyCart = 'xpath=//h3[@data-hook="EmptyState.title"]';
    this.buttonCheckout = "xpath=//span[text()='Checkout']";
  }
}

export { pageCartPage };
