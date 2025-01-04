import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TCGdexService } from '../../services/tcgdex.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-set-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'set-details.component.html',
  styleUrls: ['set-details.component.scss'],
})
export class SetDetailsComponent implements OnInit {
  private subscription: Subscription | null = null
  set: any = null;
  error: any = null;

  constructor(private tcgdexService: TCGdexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const setId = this.route.snapshot.paramMap.get('id');

    if (setId) {
      this.subscription = this.tcgdexService.getSetById(setId).subscribe({
        next: (setData: any) => {
          this.set = {
            ...setData,
            cards: setData.cards.reverse()
          };
        },
        error: (err: any) => {
          console.error('Erreur lors de la récupération du set :', err);
        },
      });
    }
  }

  getCardImage(url: string, extension: string, quality: string,): string {
    return this.tcgdexService.getImageUrl(url, extension, quality);
  }

  searchOnEbay(cardName: string, cardId: string): void {
    const ebayUrl = `https://www.ebay.fr/sch/i.html?_nkw=${encodeURIComponent(cardName + ' ' + cardId.slice(-3) + '/' + this.set.cardCount.official)}`;
    window.open(ebayUrl, '_blank'); // Ouvre le lien dans un nouvel onglet
  }

  ngOnDestroy(): void {
    // Nettoyer la subscription pour éviter les fuites de mémoire
    this.subscription?.unsubscribe();
  }
}

