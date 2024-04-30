import { Component } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent {

  cards: any[] = []
  typeCard: any[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCardsByCustomerId().subscribe(
      (data: any) => {
        this.cards = data;
      }
    );
  }
}
