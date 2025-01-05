import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TCGdexService } from '../../services/tcgdex.service';
import { Observable } from 'rxjs';
import { Set } from '../../interfaces/set.interface';
import { map } from 'rxjs/operators';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FilterCardsPipe } from '../../pipes/filter-cards.pipe';

@Component({
  selector: 'app-set-details',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    FilterCardsPipe
  ],
  templateUrl: 'set-details.component.html',
  styleUrls: ['set-details.component.scss'],
})
export class SetDetailsComponent implements OnInit {
  set$: Observable<Set> | null = null;
  currentSet: Set | null = null;
  error: any = null;
  searchValue: string = '';

  constructor(private tcgdexService: TCGdexService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const setId = this.route.snapshot.paramMap.get('id');

    if (setId) {
      this.set$ = this.tcgdexService.getSetById(setId).pipe(
        map((setData: Set) => ({
          ...setData,
          cards: setData.cards ? setData.cards.reverse() : []
        }))
      )
      this.set$.subscribe((set: Set) => {
        this.currentSet = set;
      });
    }
  }

  getCardImage(url: string, extension: string, quality: string,): string {
    return this.tcgdexService.getImageUrl(url, extension, quality);
  }

  searchOnEbay(cardName: string, cardId: string, localId: string): void {
    if (this.currentSet) {

      const containsAlphabet = /[a-zA-Z]/.test(localId);
      const ebayUrl = `https://www.ebay.fr/sch/i.html?_nkw=${encodeURIComponent(
        cardName
        + ' '
        + cardId.slice(-3)
        + (containsAlphabet
          ? ''
          : '/' + this.currentSet.cardCount.official
        )
      )}`;
      window.open(ebayUrl, '_blank');
    }
  }

  // searchOnCardMarket()
}

