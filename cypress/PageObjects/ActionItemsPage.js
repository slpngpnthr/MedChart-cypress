
class ActionItemsPage {

    pageHeader = 'Action Items';
   
    getPageHeader(){
        return cy.get('h3');
    }

   clickOptionButtonByReqID(reqID){
    
        cy.contains('.col-lg-1', reqID)
            .parents('[class="mt-3 ml-1 mr-1 p-2 row"]')
            .within(() => {
                cy.get('.btn')
                    .contains('button', 'Options')
                    .click()
            }); //click to expand the dropwdown
    
    }            
               
    clickRequestDetailsByReqID(reqID){
        cy.contains('.col-lg-1', reqID)
            .parents('[class="mt-3 ml-1 mr-1 p-2 row"]')
            .within(() => {
                cy.get('.btn')
                    .contains('button', 'Options')
                    .click()
            }); 
        cy.contains('span', 'Request Details').click();	
    }
}
     

export default ActionItemsPage