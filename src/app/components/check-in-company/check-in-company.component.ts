import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-check-in-company',
  templateUrl: './check-in-company.component.html',
  styleUrls: ['./check-in-company.component.css']
})
export class CheckInCompanyComponent {
  constructor(private userService:UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  ruc = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  departament = new FormControl('', [Validators.required]);
  district = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);


  onSubmit() {
    const emailValue = this.email.value;
    const nameValue = this.name.value;
    const rucValue = this.ruc.value;
    const addressValue = this.address.value;
    const departamentValue = this.departament.value;
    const districtValue = this.district.value;
    const phoneNumberValue = this.phoneNumber.value;
    const passwordValue = this.password.value;
    const confirmPasswordValue = this.confirmPassword.value;
  
    const user: any = {
      email: emailValue,
      name: nameValue,
      ruc: rucValue,
      address: addressValue,
      department: departamentValue,
      district: districtValue,
      phoneNumber: phoneNumberValue,
      password: passwordValue,
      repeatPassword: confirmPasswordValue
    };

    this.userService.createCompany(user).subscribe(
      (res: any) => {
        this.authService.setUser(res);
        this.router.navigate(['/view/products']);
      }
    );
  }
  
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  save() {
    this.onSubmit();
  }
}
