import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';

/*proporciona servicios de red para las aplicaciones Angular. 
Permite realizar solicitudes HTTP a servidores remotos y 
recibir respuestas en formato JSON u otros formatos.*/
import {HttpClientModule} from '@angular/common/http'

/*proporciona servicios de enrutamiento para las aplicaciones 
web de Angular. Permite configurar la navegación de la aplicación 
y definir rutas que corresponden a distintas páginas o componentes 
de la misma.*/
import {RouterModule} from '@angular/router';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component'

import { MaterialModule } from 'src/shared/material.module';
import { LoginSessionComponent } from './components/login-session/login-session.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProductsComponent } from './components/products/products.component';
import { ToolbarSessionComponent } from './components/toolbar-session/toolbar-session.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckInCompanyComponent } from './components/check-in-company/check-in-company.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { ConfirmacionCompraComponent } from './components/confirmacion-compra/confirmacion-compra.component';
import { SaleHistoryComponent } from './components/sale-history/sale-history.component';
import { ConfirmationEditprofileComponent } from './components/confirmation-editprofile/confirmation-editprofile.component';
import { ViewCardsComponent } from './components/view-cards/view-cards.component';
import { DeletePublicationComponent } from './components/delete-publication/delete-publication.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { EditProfileCompanyComponent } from './components/edit-profile-company/edit-profile-company.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RecoverPasswordComponent,
    LoginSessionComponent,
    CheckInComponent,
    PaymentMethodComponent,
    ProductsComponent,
    ToolbarSessionComponent,
    ChatboxComponent,
    EditProfileComponent,
    ConfirmPurchaseComponent,
    PurchaseHistoryComponent,
    CarritoComponent,
    CheckInCompanyComponent,
    CerrarSesionComponent,
    AddCardComponent,
    ConfirmacionCompraComponent,
    SaleHistoryComponent,
    ConfirmationEditprofileComponent,
    ViewCardsComponent,
    DeletePublicationComponent,
    AddProductComponent,
    ViewProductsComponent,
    EditProductComponent,
    SaleDetailComponent,
    EditProfileCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
