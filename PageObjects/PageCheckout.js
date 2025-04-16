class pageCheckout {
  constructor(page) {
    this.page = page;
    //Define XPath as properties here
    this.fieldEmail = "xpath=//input[@aria-label='Email']";
    this.fielFirstName = "xpath=//input[@aria-label='First name']";
    this.fieldLastName = "xpath=//input[@aria-label='Last name']";
    this.fieldPhone = "xpath=//input[@aria-label='Phone']";
    this.dropdownCountryRegion = "xpath=//div[@data-hook='form-field-country']";
    this.dropdownOption = "xpath=//div[text()='Estonia']";
    this.fieldAdress =
      "xpath=//div[@data-hook='form-field-address_line']//input[@role='combobox']";
    this.fieldCity = "xpath=//input[@aria-label='City']";
    this.fieldZipCode = "xpath=//input[@aria-label='Zip / Postal code']";
    this.buttonContinueCheckout1 = "xpath=//span[text()='Continue']";
    this.buttonContinueCheckout2 = "xpath=//span[text()='Continue']";
    this.buttonPlaceOrder = "xpath=//span[text()='Place Order & Pay']";
  }
}

export { pageCheckout };
