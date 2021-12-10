/// <reference types="cypress" />

import LoginPage from '../PageObjects/LoginPage';
import ClientSearchPage from '../PageObjects/ClientSearchPage'
import ClientInfoPage from '../PageObjects/ClientInfoPage'
import SearchProviderPage from '../PageObjects/SearchProviderPage'
import CommonActions from '../PageObjects/CommonActions'
import NewRequestPages from '../PageObjects/NewRequestPages'
import ActionItemsPage from '../PageObjects/ActionItemsPage'
import EditRequestDetailsDialog from '../PageObjects/EditRequestDetailsDialog'
//import data from '../fixtures/testData.json'

describe('Assessment', () => {
	
	before(function(){
        cy.fixture('testData').then((data) =>
        {
            this.data=data ;
        })
    })
    
	//Executes before each test cases
	beforeEach(() => {
		//cy.exec('npm cache clear --force')
		cy.visit(Cypress.env('url'));
        
	})
	
	//declares different test cases
	it('Assessment 10 steps - Create a request and update dates', function() {
		
		const loginPage = new LoginPage();
		const cSearchPage = new ClientSearchPage();
        const cinfoPage = new ClientInfoPage();
        const searchProviderPage = new SearchProviderPage();
		const newRequestPages = new NewRequestPages();
		const commonActions = new CommonActions();
		const actionItemsPage = new ActionItemsPage();
		const editRequestDetailsDialog = new EditRequestDetailsDialog();

        //Login Page
		loginPage.getPageHeader()
            .invoke('text')
            .should('equal', loginPage.pageHeader);        
        loginPage.enterEmail(this.data.username);        
        loginPage.enterPassword(this.data.password);    
        loginPage.clickLoginButton();
        	
		
		//Step #1 Search for the Client and select it from the table		
				
        //verify We are at Clients Page
		cSearchPage.getPageHeader()
			.invoke('text')
			.should('equal', cSearchPage.pageHeader);

		//Enter search criteria and select patient
		cSearchPage.enterTextinSearch(this.data.clientID);					
        cSearchPage.clickClientRecordinSearch(this.data.clientID);
        cinfoPage.getPageHeader()
            .invoke('text')
			.should('contains', cinfoPage.pageHeader);
		
		//Step#2 click New Request button
		cinfoPage.clickNewRequestButton();
		searchProviderPage.getPageHeader()
			.invoke('text')
			.should('contains', searchProviderPage.pageHeader);
		
		//Enter State and init Search
		searchProviderPage.setState(this.data.state);
		searchProviderPage.clickSearchButton()					
		searchProviderPage.getAllProviderRows() //assert there are results
			.its('length')
			.should('be.gt', 0); 
            
		//Step#3 Select the provider
		searchProviderPage.clickProviderinSearchResultByName(this.data.provider);
		
		//Step#4 clicks on all checkboxes

		//Verify the alert is displayed with the provider name
		cy.wait(1000).then(() => {
			cy.get(newRequestPages.alertLocator)
			   .invoke('text')
			   .should('contains', this.data.provider);
		   });
			
		//Verify checkbox list is displayed 
		newRequestPages.getSelectionPanelHeader()
			.invoke('text')
			.should('contains', newRequestPages.chkBoxPanelHeader);
		
		newRequestPages.checkAllServiceChkBoxes()
		newRequestPages.clickNextButton()
		
		//Step#5 
		newRequestPages.getMRNTextField(this.data.MRN); // set MRN
		newRequestPages.setFromDateTextField(this.data.fromDate+ '{Enter}'); // From date
		newRequestPages.setToDateTextField(this.data.toDate + '{Enter}'); // To date	
		newRequestPages.clickNextButton()
		 
		//Step #6
		newRequestPages.clickAddToActionItemsButton();			
		
		//Init reqID Alias to be used later
		newRequestPages.setRequestIDFromAlert();
		newRequestPages.getAlertWithProviderDetail()
			.invoke('text')
			.should('contains', this.data.provider);

     	//Step#7 Navigate to Action Items page 
		commonActions.clickActionItems();
		
		//Verify We are in correct page 
		actionItemsPage.getPageHeader()
			.invoke('text')
			.should('contains', actionItemsPage.pageHeader);
		 
		 //Step#8 Click on Option action for the new Request
		 cy.get('@reqID').then((reqID) => {
			 console.log(reqID);
			 actionItemsPage.clickOptionButtonByReqID(reqID);
		 });		 	

		//Verify all 3 options are displayed n the dropdown
		 cy.contains('span', 'Edit Request').should('be.visible');
		 cy.contains('span', 'Request Details').should('be.visible');
		 cy.contains('span', 'Delete Request').should('be.visible');
	
		//click on Edit Request
		cy.contains('span', 'Edit Request').click();

		//Ste#9 Verify Request Details (Edit Request) 	dialog is open
		editRequestDetailsDialog.getDialogHeader()
			.invoke('text')
			.should('contains', editRequestDetailsDialog.dialogHeader);
		
		//Step #10  Modify Request and verify Date are updated in the 
		
		editRequestDetailsDialog.setFromDate(this.data.updatedFromDate);
		editRequestDetailsDialog.setToDate(this.data.updatedToDate);
		editRequestDetailsDialog.setRecordsNote("Some Notes");
		editRequestDetailsDialog.clickSaveButton();
		
		//View Request Details Page
		cy.get('@reqID').then((reqID) => {
			actionItemsPage.clickRequestDetailsByReqID(reqID);
		});
		//VErify updated Dates for the Request (it fails) 
		cy.contains('label', 'Requested Date Range')
			.next()
			.should('have.text', this.data.updatedFromDate + ' to ' + this.data.updatedToDate);
		
	});
		
});
