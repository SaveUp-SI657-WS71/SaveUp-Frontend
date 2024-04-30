import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent {
  constructor(private location: Location,private router:Router) {}

  toolbarDisabled: boolean = true;
  
  logout() {
    this.router.navigate(['/carrito']);
  }

  cancelar() {
    this.location.back();
  }
}
