import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-publication',
  templateUrl: './delete-publication.component.html',
  styleUrls: ['./delete-publication.component.css']
})
export class DeletePublicationComponent {
  constructor(private location: Location,private router:Router) {}

  toolbarDisabled: boolean = true;
  
  public logout() {
      this.router.navigate(['/app/product']);
  }

  cancelar() {
      this.location.back();
  }
}
