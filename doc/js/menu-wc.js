'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">market-system-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' :
                                            'id="xs-controllers-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' :
                                        'id="xs-injectables-links-module-AuthModule-286a2b9aa5b60b47a61cefb5303ea4b5afe0fcc31b3c799c1bbcff22b3d294c4f1c29f91891fbe5c043c61b453239f7c674a609b3aefb53b47bb719468af3606"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link" >ErrorModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ErrorModule-a71622945bd2db379363ff473abd53ec637f41505cf4a9603092dcb55182e9183fb405fc7ad5fb72d5ce66cff99ec9bbef6f48f82a23e4f61eb21f4b9487498e"' : 'data-bs-target="#xs-injectables-links-module-ErrorModule-a71622945bd2db379363ff473abd53ec637f41505cf4a9603092dcb55182e9183fb405fc7ad5fb72d5ce66cff99ec9bbef6f48f82a23e4f61eb21f4b9487498e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ErrorModule-a71622945bd2db379363ff473abd53ec637f41505cf4a9603092dcb55182e9183fb405fc7ad5fb72d5ce66cff99ec9bbef6f48f82a23e4f61eb21f4b9487498e"' :
                                        'id="xs-injectables-links-module-ErrorModule-a71622945bd2db379363ff473abd53ec637f41505cf4a9603092dcb55182e9183fb405fc7ad5fb72d5ce66cff99ec9bbef6f48f82a23e4f61eb21f4b9487498e"' }>
                                        <li class="link">
                                            <a href="injectables/ErrorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceModule.html" data-type="entity-link" >InvoiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' : 'data-bs-target="#xs-controllers-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' :
                                            'id="xs-controllers-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' }>
                                            <li class="link">
                                                <a href="controllers/InvoiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' : 'data-bs-target="#xs-injectables-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' :
                                        'id="xs-injectables-links-module-InvoiceModule-2c698754ca801e15f3b593af4ffeac4545b127a9f0a005dcb839cb73d09b5e52e5d6df2f12d953c98ff8035b07ffca978b08da7fd10ebf327d5267812ddc8ab7"' }>
                                        <li class="link">
                                            <a href="injectables/InvoiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemModule.html" data-type="entity-link" >ItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' : 'data-bs-target="#xs-controllers-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' :
                                            'id="xs-controllers-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' }>
                                            <li class="link">
                                                <a href="controllers/ItemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' : 'data-bs-target="#xs-injectables-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' :
                                        'id="xs-injectables-links-module-ItemModule-13b1237637accbd073729c0607169c1dc9954e8e2b4afe582530dd414ea9221f0151e8fae01c1598f8800d65debf9c0df4f2ef98352618068d702eed7e4084f9"' }>
                                        <li class="link">
                                            <a href="injectables/ItemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link" >ReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReportModule-f18caf91fc4915975307e5f7c8ef30f5ec1b4e381fc666628823ae6a75a1b3ce79e0249bbd44290d09dd5b1836a1c8a6441336c896d20e762cfdb46bb11fd873"' : 'data-bs-target="#xs-controllers-links-module-ReportModule-f18caf91fc4915975307e5f7c8ef30f5ec1b4e381fc666628823ae6a75a1b3ce79e0249bbd44290d09dd5b1836a1c8a6441336c896d20e762cfdb46bb11fd873"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReportModule-f18caf91fc4915975307e5f7c8ef30f5ec1b4e381fc666628823ae6a75a1b3ce79e0249bbd44290d09dd5b1836a1c8a6441336c896d20e762cfdb46bb11fd873"' :
                                            'id="xs-controllers-links-module-ReportModule-f18caf91fc4915975307e5f7c8ef30f5ec1b4e381fc666628823ae6a75a1b3ce79e0249bbd44290d09dd5b1836a1c8a6441336c896d20e762cfdb46bb11fd873"' }>
                                            <li class="link">
                                                <a href="controllers/ReportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReturnedInvoiceModule.html" data-type="entity-link" >ReturnedInvoiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' : 'data-bs-target="#xs-controllers-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' :
                                            'id="xs-controllers-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' }>
                                            <li class="link">
                                                <a href="controllers/RetrunedInvoiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RetrunedInvoiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' : 'data-bs-target="#xs-injectables-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' :
                                        'id="xs-injectables-links-module-ReturnedInvoiceModule-8677a1af6948c3d382c7ee44fa5e335acb14cbecf48f463f72e5dbe18be054b628031c338938f683b31f73fdb5b601d9353d67141a87bb7350fc8b79b15c623f"' }>
                                        <li class="link">
                                            <a href="injectables/ReturnedInvoiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReturnedInvoiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InvoiceController.html" data-type="entity-link" >InvoiceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItemController.html" data-type="entity-link" >ItemController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReportController.html" data-type="entity-link" >ReportController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RetrunedInvoiceController.html" data-type="entity-link" >RetrunedInvoiceController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/ErrorEntitiy.html" data-type="entity-link" >ErrorEntitiy</a>
                                </li>
                                <li class="link">
                                    <a href="entities/InvoiceEntity.html" data-type="entity-link" >InvoiceEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ItemEntity.html" data-type="entity-link" >ItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReturnedInvoiceEntity.html" data-type="entity-link" >ReturnedInvoiceEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreataUserDto.html" data-type="entity-link" >CreataUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceDto.html" data-type="entity-link" >CreateInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateItemDto.html" data-type="entity-link" >CreateItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReturnedInvoiceDto.html" data-type="entity-link" >CreateReturnedInvoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateItemDto.html" data-type="entity-link" >UpdateItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNumberOfItems.html" data-type="entity-link" >UpdateNumberOfItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link" >ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceService.html" data-type="entity-link" >InvoiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemService.html" data-type="entity-link" >ItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReturnedInvoiceService.html" data-type="entity-link" >ReturnedInvoiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DataInvoiceReportInterface.html" data-type="entity-link" >DataInvoiceReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateItemReportInterface.html" data-type="entity-link" >DateItemReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceReportInterface.html" data-type="entity-link" >InvoiceReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemInterface.html" data-type="entity-link" >ItemInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemReportInterface.html" data-type="entity-link" >ItemReportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayloadInterface.html" data-type="entity-link" >JwtPayloadInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/swaggerInterface.html" data-type="entity-link" >swaggerInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateInvoiceIterface.html" data-type="entity-link" >UpdateInvoiceIterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});