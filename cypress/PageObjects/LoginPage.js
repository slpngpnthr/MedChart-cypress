class LoginPage {

    pageHeader = 'Sign In';
    getPageHeader(){
        return cy.get('h2');

    }
    getEmailTextBox(){
        return cy.get('#Input_Email');
    }

    getPasswordTextBox(){
        return cy.get('#Input_Password')
    }

    enterEmail(username){
        cy.get('#Input_Email').type(username);
    }

    enterPassword(pw){
        cy.get('#Input_Password').type(pw);
    }

    clickLoginButton(){
        cy.contains('button', 'Log in').click();
    }

    clickSignUpButton(){
        cy.get('.btn')
                .contains('Sign Up')
                .click() ;
    }

}
export default LoginPage