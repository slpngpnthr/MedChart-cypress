class SearchProviderPage {

pageHeader = 'New Request';

    setState(state){
        cy.get('.pr-2')
			.eq(2).click()
			.find('input').eq(0)
			.type(state + '{enter}'); 
    }

    getPageHeader(){
        return cy.get('h3');
    }
      
    clickSearchButton(){
        cy.contains('button', ' Search').click();
    }

    getAllProviderRows(){
        return cy.get('.p-selectable-row');    
    }
    getProviderFromSearchResultByName(provider)
    {
        return cy.contains(provider);
    }
    clickProviderinSearchResultByName(provider)
    {
        cy.contains(provider).click();
    }
   
}
export default SearchProviderPage
