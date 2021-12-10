
class NewRequestPages {

    chkBoxPanelHeader = 'Select type:';    
    fromDateSelector = '#input-from-0';
    toDateSelector = '#input-to-0';
    alertLocator = 'div[role="alert"]';

    pageNRReviewPageHeader = 'Review Request Details';

    clickBackButton(){
        cy.contains('button','Back').click();
    }
    clickNextButton(){
        cy.contains('button','Next').click();
    }
    clickAddToActionItemsButton(){
        cy.contains('button', 'Add to Action Items').click();
    }
    clickReviewandSubmitButton(){
        cy.contains('button', 'Review & Submit').click();
    }

    getNRSelectPageHeader(){
        return cy.get('h3');
    }

    getSelectionPanelHeader(){
        return cy.get('h4');
    }

    getAllServiceChkboxes(){
        return cy.get('[type="checkbox"]') ;
    }

    getRecordsChkBox(){
        return cy.contains('input','Records');
    }
    
    getImagingChkBox(){
        return cy.contains('input','Imaging');
    }

    getFBillingChkBox(){
        return cy.contains('input','Facility Billing');
    }
    
    getERillingChkBox(){
        return cy.contains('input','ER Billing');        
    }
    
    getPhyBillingChkBox(){
        return cy.contains('input','Physician Billing');
    }
    
    getRadioBillingChkBox(){
        return cy.contains('input','Radiology Billing');
    }
    
    getPatBillingChkBox(){
        return cy.contains('input','Pathology Billing');
    }
    
    getEMSTripReportsChkBox(){
        return cy.contains('input','EMS Trip Reports');
    }
    getDescriptorTextBox(){
        return cy.contains('label','Add label/descriptor to request (optional):').next();
    }
   
    getAlertMessage(){
        cy.wait(1000).then(() => {
            return cy.get('div[role="alert"]').invoke('text');
        });
    }

    getNREnterDetailsPageHeader(){
        return cy.get('h4');
    }
  
    getFromDateTextField(){
        
        return cy.get(this.fromDateSelector);
    }
    getToDateTextField(){
        return cy.get(this.toDateSelector);
    }

    getMRNTextField(){
        return cy.get('.ml-2 > .form-control') ;
    }

    getClientName(){
        return cy.get('label', 'firstName').next();
    }

    getNRReviewPageHeader(){
        return cy.get('h3');
    }
    
    getAlertWithProviderDetail(){
        return cy.get('div[role="alert"]')
                .eq(0);
    }

    //improve: to wait until the Alert with ID is 
    //displayed instead of fixed amount of time

    setRequestIDFromAlert(){
        cy.wait(5000).then(() => {
            
            cy.get('div[role="alert"]')
               .eq(1)
               .invoke('text')
               .should('contains', 'ID')
               .then(alertText => {
                   const reqID = alertText.match(/\d+/)[0];//Get Digits (reqID) from the Alert 
                   cy.wrap(reqID).as('reqID'); //Create Allias for reqID to be used in a later step. 
                   cy.log(reqID);
                   
               }); 
            });
        }
}

export default NewRequestPages



    


