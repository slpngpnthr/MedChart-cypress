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
        
        loginPage.getEmailTextBox()
			.type(this.data.username);
        
        loginPage.getPasswordTextBox()
            .type(this.data.password);
    
        loginPage.clickLoginButton();
        	
		
		//Step #1 Search for the Client and select it from the table		
				
        //verify We are at Clients Page
		cSearchPage.getPageHeader()
			.invoke('text')
			.should('equal', cSearchPage.pageHeader);

		cSearchPage.getSearchTextBox()
			.type(this.data.clientID);
					
        cSearchPage.getClientRecordFromTable(this.data.clientID)
			.should('have.text', this.data.clientID)
			.click();

        cinfoPage.getPageHeader()
            .invoke('text')
			.should('contains', cinfoPage.pageHeader);
		
		//Step#2
		cinfoPage.getNewRequestButton()
			.click();

		//Verify We are in correct page 
		searchProviderPage.getPageHeader()
			.invoke('text')
			.should('contains', searchProviderPage.pageHeader);
		
		//Select State 
		searchProviderPage.setState(this.data.state);
		searchProviderPage.clickSearchButton()					
		
        searchProviderPage.getAllProviderRows()
			.its('length')
			.should('be.gt', 0); //the search result should have > 0 rows
            
		//Step#3 Select the provider
		searchProviderPage.getProviderFromSearchResultByName(this.data.provider)
			.click(); 
		
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
		
		newRequestPages.getAllServiceChkboxes()
			.check();  
		
		//clicks on Next button
		newRequestPages.clickNextButton()
			
		
		//Step#5 
		newRequestPages.getMRNTextField() // Set MRN 
			.clear()
			.type(this.data.MRN); // 
		newRequestPages.getFromDateTextField()
			.type(this.data.fromDate); //From date
		
		newRequestPages.getToDateTextField()
			.type(this.data.toDate+ '{Enter}'); // To date		 
		
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
		 cy.contains('span', 'Edit Request').should('be.visible');
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
