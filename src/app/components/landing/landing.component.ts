import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) { }

  buttonText: string = 'Registrarse';
  redirectTimeout: any;

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit() {
    this.startTimeout();
  }

  startTimeout() {
    this.redirectTimeout = setTimeout(() => {
      this.toggleButtonText();
      this.startTimeout();
    }, 3000);
  }

  toggleButtonText() {
    this.buttonText = this.buttonText === 'Registrarse' ? 'Iniciar sesión' : 'Registrarse';
  }

  redirect() {
    if (this.buttonText === 'Iniciar sesión') {
      this.router.navigate(['/login/session']);
    } else {
      this.router.navigate(['/check/in']);
    }
  }

}
