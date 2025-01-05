import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TCGdexService } from '../../services/tcgdex.service';
import { Observable, Subject } from 'rxjs';
import { Set } from '../../interfaces/set.interface';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Card } from '../../interfaces/card.interface';


@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule
  ]
})

export class SearchComponent implements OnInit {
  cards$: Observable<Card[]> | null = null;
  searchValue: string = "";
  private searchSubject = new Subject<string>();

  constructor(private tcgdexService: TCGdexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cards$ = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchValue) =>
        this.tcgdexService.searchCard(searchValue).pipe(
          map((cards: Card[]) => cards)
        )
      )
    );
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }
  getCardImage(url: string, extension: string, quality: string,): string {
    return this.tcgdexService.getImageUrl(url, extension, quality);
  }

  // searchOnEbay(cardName: string, cardId: string, localId: string): void {
  //   if (this.currentSet) {

  //     const containsAlphabet = /[a-zA-Z]/.test(localId);
  //     const ebayUrl = `https://www.ebay.fr/sch/i.html?_nkw=${encodeURIComponent(
  //       cardName
  //       + ' '
  //       + cardId.slice(-3)
  //       + (containsAlphabet
  //         ? ''
  //         : '/' + this.currentSet.cardCount.official
  //       )
  //     )}`;
  //     window.open(ebayUrl, '_blank');
  //   }
  // }
}