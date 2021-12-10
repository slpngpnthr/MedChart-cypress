
class CommonActions {

    clickDashboardLink(){
        cy.contains('a','Dashboard').click();
    }
    clickClientsLink(){
        cy.contains('a','Clients').click();
    }
    clickActionItems(){
        cy.contains('a','Action Items').click();
    }
    clickPendingInvoicesLink(){
        cy.contains('a','Pending Invoices').click();
    }

    
}
export default CommonActions