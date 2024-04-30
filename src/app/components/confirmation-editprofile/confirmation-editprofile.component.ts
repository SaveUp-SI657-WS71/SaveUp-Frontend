import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-confirmation-editprofile',
  templateUrl: './confirmation-editprofile.component.html',
  styleUrls: ['./confirmation-editprofile.component.css']
})
export class ConfirmationEditprofileComponent {
  user = this.authService.getUser();

  constructor(private location: Location,private router:Router, private authService: AuthService) {}

  toolbarDisabled: boolean = true;
  
  logout() {
    if(this.user?.lastName) {
      this.router.navigate(['/edit/profile']); 
    } else if (this.user?.ruc) {
      this.router.navigate(['/edit/company']); 
    }
  }

  cancelar() {
    this.location.back();
  }
}
