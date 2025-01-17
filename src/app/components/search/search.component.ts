import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TCGdexService } from '../../services/tcgdex.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Card } from '../../interfaces/card.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    FormsModule,
    ProgressSpinnerModule,
  ]
})

export class SearchComponent implements OnInit {
  cards$: Observable<Card[]> | null = null;
  loading: boolean = false;
  searchValue: string = "";
  private searchSubject = new Subject<string>();

  constructor(private tcgdexService: TCGdexService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cards$ = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((searchValue) => searchValue.trim().length > 2 || searchValue.trim().length === 0),
      tap(() => (this.loading = true)),
      switchMap((searchValue) =>
        searchValue.trim() === ""
          ? of([]).pipe(tap(() => (this.loading = false)))
          : this.tcgdexService.searchCard(searchValue).pipe(
            tap(() => (this.loading = false)),
            finalize(() => (this.loading = false))
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

  searchOnEbay(card: Card): void {
    const containsAlphabet = /[a-zA-Z]/.test(String(card.localId));
    const ebayUrl = `https://www.ebay.fr/sch/i.html?_nkw=${encodeURIComponent(
      card.name
      + ' '
      + card.id.slice(-3)
      + (containsAlphabet
        ? ''
        : '/' + card.cardCount!.official
      )
    )}`;
    window.open(ebayUrl, '_blank');
  }
}
