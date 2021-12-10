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