import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-session',
  templateUrl: './toolbar-session.component.html',
  styleUrls: ['./toolbar-session.component.css']
})
export class ToolbarSessionComponent implements OnInit {
  //searchText: string = '';
  isMenuOpen: boolean = false; // Propiedad para controlar la apertura y cierre del menú
  isScreenSmall: boolean = false; // Propiedad para verificar si la pantalla es pequeña

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth <= 960;
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Cambia el estado del menú al hacer clic en el botón de menú
  }

  clickPaginaPrincipal(): void {
    const user = this.authService.getUser();
    const pay_id = this.authService.getOrder()?.payId;

    if(user?.lastName) {
      this.router.navigate(['/products']);
    } else if (user?.ruc) {
      this.router.navigate(['/view/products']);
    }
  }

  clickBandejaEntrada(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/chatbox']);
    } else if (user?.ruc) {
      this.router.navigate(['/chatbox']);
    }
  }

  clickPerfil(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/edit/profile']);
    } else if (user?.ruc) {
      this.router.navigate(['/edit/company']);
    }
  }

  clickHistorial(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/purchase/history']);
    } else if (user?.ruc) {
      this.router.navigate(['/sale/history']);
    }
  }

  clickShoppingCart(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/carrito']);
    } else if (user?.ruc) {
      return;
    }
  }

  clickCerrarSesion(): void {
    const user = this.authService.getUser();

    if(user?.lastName) {
      this.router.navigate(['/close/session']);
    } else if (user?.ruc) {
      this.router.navigate(['/close/session']);
    }
  }
}