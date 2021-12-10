
class ClientInfoPage {

    pageHeader = 'Client Information';
    getClientName(){
        return cy.get('label', 'firstName').next();
    }

    getPageHeader(){
        return cy.get('h3');
    }

    getClientFileNumber(){
        return cy.get('label', 'File Number').next();
    }
        
    getClientLawyerTeam(){
        return cy.get('label', 'Lawyer Teams').next();
    }

    getClientRecordFromTable(clientInfo){
        return cy.contains('td', clientInfo);
    }

    clickNewRequestButton(){
        cy.contains('button',  'New Request').click();
    }
    
}
export default ClientInfoPage