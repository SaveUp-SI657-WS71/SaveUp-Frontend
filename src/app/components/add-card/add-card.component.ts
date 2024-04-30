import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CardService } from 'src/app/services/card.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {
  selectedCard: string = ''; // Variable para almacenar la tarjeta seleccionada

  selectCard(card: string) {
    this.selectedCard = card;
  }

  constructor(private authService: AuthService, private cardService: CardService, private location: Location) { }

  name = new FormControl('', [Validators.required]);
  number = new FormControl('', [Validators.required]);
  cvv = new FormControl('', [Validators.required]);


  save() {
    const user = this.authService.getUser();
    const nameValue = this.name.value;
    const numberValue = this.number.value;
    const cvvValue = this.cvv.value;
  
    const card: any = {
      cardName:nameValue,
      cardNumber: numberValue,
      cvv: cvvValue,
      type: this.selectedCard,
      customerId: user.id
    };

    this.cardService.createCard(card).subscribe(
      (data: any) => {
        console.log(data);
      }
    );

    this.location.back();
  }
}
