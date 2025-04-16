class pagePLP {
  constructor(page) {
    this.page = page;
    //Define XPath as properties here
    this.buttonSorting = "xpath=//span[text()='Sorting']";
    this.buttonAddToCartPLP =
      "xpath=//div[@data-slug='americano']//span[text()='Add to Cart']";
  }
}

export { pagePLP };
