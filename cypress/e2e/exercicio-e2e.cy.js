/// <reference types="cypress" />
import produtoPage, { ProdutoPage } from '../support/page_objects/produto.page';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.fixture('produtos').then((Produtos) => {
            Produtos.forEach((produto) => {
                produtoPage.visitarProduto(produto.nome);
                produtoPage.adicionarProdutoAoCarrinho(
                    produto.tamanho,
                    produto.cor,
                    produto.quantidade,
                );
                cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
                cy.get('#cart > .dropdown-toggle').click();
            });
            cy.get('.woocommerce-message > .button').click();
            cy.get('.checkout-button').click();
            cy.get('.showlogin').click();
            cy.get('#username').type('aluno_ebac@teste.com')
            cy.get('#password').type('teste@teste.com')
            cy.get('.woocommerce-button').click()
            cy.get('#terms').check();
            cy.get('#place_order').click();
            cy.get('.woocommerce-notice', {timeout:10000}).should('contain', 'Seu pedido foi recebido')
        })

        })

    })





