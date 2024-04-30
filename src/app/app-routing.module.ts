import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { LoginSessionComponent } from './components/login-session/login-session.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ProductsComponent } from './components/products/products.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProfileCompanyComponent } from './components/edit-profile-company/edit-profile-company.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { CheckInCompanyComponent } from './components/check-in-company/check-in-company.component';
import { ConfirmPurchaseComponent } from './components/confirm-purchase/confirm-purchase.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingComponent },
  { path: 'recover/password', component: RecoverPasswordComponent },
  { path: 'login/session', component: LoginSessionComponent },
  { path: 'check/in', component: CheckInComponent },
  { path: 'payment/method', component: PaymentMethodComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'chatbox', component: ChatboxComponent},
  { path: 'edit/profile', component: EditProfileComponent },
  { path: 'edit/company', component: EditProfileCompanyComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'purchase/history', component: PurchaseHistoryComponent },
  { path: 'sale/history', component: SaleHistoryComponent },
  { path: 'check/company', component: CheckInCompanyComponent },
  { path: 'confirm/purchase', component: ConfirmPurchaseComponent },
  { path: 'confirm/edit/profile', component: ConfirmationEditprofileComponent },
  { path: 'purchase/successful', component: ConfirmacionCompraComponent },
  { path: 'close/session', component: CerrarSesionComponent },
  { path: 'add/card', component: AddCardComponent },
  { path: 'view/cards', component: ViewCardsComponent },
  { path: 'delete/publication', component: DeletePublicationComponent },
  { path: 'add/product', component: AddProductComponent },
  { path: 'view/products', component: ViewProductsComponent },
  { path: 'edit/product/:id', component: EditProductComponent },
  { path: 'sale/detail', component: SaleDetailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
