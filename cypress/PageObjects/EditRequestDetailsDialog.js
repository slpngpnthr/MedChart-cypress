
class EditRequestDetailsDialog {

       
    fromDateSelector = '#input-from-0';
    toDateSelector = '#input-to-0';
    //MRNSelector
    dialogHeader = 'Request Details';

    getDialogHeader(){
        return cy.get('h5');
    }

    clickCloseButton(){
        cy.contains('button','Close').click();
    }
    clickSaveButton(){
        cy.contains('button','Save').click();
    }
    clickPresentDateChkBox(){
        cy.contains('Input','Present Date').click();
    }

    setFromDate(fDate){
        cy.get(this.fromDateSelector)
        .clear()
        .type(fDate + '{Enter}'); //From date
    }
    setToDate(toDate){
        cy.get(this.toDateSelector)
        .clear()
        .type(toDate + '{Enter}'); //From date
    }
    setRecordsNote(notes){
        cy.contains('h5','Records')
            .next()
            .type(notes);
    }
    setImagingNote(notes){
        cy.contains('h5','Imaging')
            .next()
            .type(notes);
    }
    
    setPhyBillinhNote(notes){
        cy.contains('h5','Physician Billing')
            .next()
            .type(notes);
    }
}

export default EditRequestDetailsDialog



    


