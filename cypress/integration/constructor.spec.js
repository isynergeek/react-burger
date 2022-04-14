describe('Burger constructor functionality integration test ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('should show and close modal window for ingredient', () => {
    cy.contains('Соберите бургер');

    cy.get('[class^=IngredientCard_main__]')
      .first()
      .as('ingredient');

    cy.get('@ingredient')
      .click();

    cy.get('[class^=IngredientDetails_Content__]')
      .as('card');

    cy.get('@card')
      .contains('Детали ингредиента');

    cy.get('[class^=ModalCloseButton_Root__')
      .click();
  })

  it('should put together ingredients ', () => {
    const dataTransfer = new DataTransfer();

    cy.get('[class^=IngredientCard_main__]')
      .first()
      .as('bun');

    cy.get('[class^=IngredientCard_main__]')
      .eq(2)
      .as('sauce1');

    cy.get('[class^=IngredientCard_main__]')
      .eq(3)
      .as('sauce2');

    cy.get('[class^=IngredientCard_main__]')
      .eq(6)
      .as('main1');

    cy.get('[class^=IngredientCard_main__]')
      .eq(7)
      .as('main2');

    cy.get('[class^=IngredientCard_main__]')
      .eq(8)
      .as('main3');

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

    cy.get('@sauce2')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('@main1')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('@main2')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});

    cy.get('@main3')
      .trigger('dragstart', {dataTransfer});

    cy.get('@filling')
      .trigger('drop', {dataTransfer});
  })

})
