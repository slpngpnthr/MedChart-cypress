class ClientSearchPage {

    pageHeader = 'Clients';
    getEmailTextBox() {
        return cy.get('#Input_Email');
    }

    getPageHeader() {
        return cy.get('h3');

    }

    getSearchTextBox() {
        return cy.get('input[name="Search"]');
    }

    getClientRecordFromTable(clientInfo) {
        return cy.contains('td', clientInfo);
    }
}
export default ClientSearchPage
