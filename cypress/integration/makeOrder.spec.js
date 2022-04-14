describe('Burger constructor functionality integration test ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })

  it('should login and make order', () => {
    cy.contains('Вход');

    cy.get('.input_type_email')
      .type('lex.novikoff@gmail.com');

    cy.get('.input_type_password')
      .type('a1s2d3');

    cy.get('button[type=\'submit\']')
      .click();

    const dataTransfer = new DataTransfer();

    cy.get('[class^=IngredientCard_main__]')
      .first()
      .as('bun');

    cy.get('[class^=IngredientCard_main__]')
      .eq(2)
      .as('sauce1');

    cy.get('[class^=IngredientCard_main__]')
      .eq(6)
      .as('main1');

    cy.get('[class^=BurgerConstructor_Content__]')
      .as('filling');

    cy.get('@bun')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('@sauce1')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('@main1')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('[class^=Controls_] button')
      .click();

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('makeOrder');

    cy.wait('@makeOrder');

    cy.contains('идентификатор заказа');

    cy.get('[class^=ModalCloseButton_Root__')
      .click();
  })
})
