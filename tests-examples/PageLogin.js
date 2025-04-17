class pageLogin {

constructor(page) {
this.page = page;
//Define XPath as properties here
this.buttonLoginHeader = "//span[text()='Log In']";
this.fieldEmail = "//input[@type='email']";
this.fieldPassword = "//input[@type='password']"; 
this.buttonLoginPage = "//button[@aria-disabled='false' and @data-testid='buttonElement']";

} 
}



export {pageLogin};  