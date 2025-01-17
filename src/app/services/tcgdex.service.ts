import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Serie } from "../interfaces/serie.interface";
import { Set } from "../interfaces/set.interface";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { Card } from "../interfaces/card.interface";

@Injectable({
  providedIn: 'root',
})

export class TCGdexService {
  constructor(private http: HttpClient) {
  }

  getSets(): Observable<Set[]> {
    return this.http.get<Set[]>('https://api.tcgdex.net/v2/fr/sets?sort:field=releaseDate&sort:order=DESC')
  };

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>('https://api.tcgdex.net/v2/fr/series?sort:field=releaseDate&sort:order=ASC')
  };

  getSetById(setId: string): Observable<Set> {
    return this.http.get<Set>(`https://api.tcgdex.net/v2/fr/sets/${setId}`)
  };

  getCardById(cardId: string): Observable<Card> {
    return this.http.get<Card>(`https://api.tcgdex.net/v2/en/cards/${cardId}`)
  };

  searchCard(searchValue: string, serie?: string): Observable<Card[]> {
    if (serie) {
      return this.http.get<Card[]>(`https://api.tcgdex.net/v2/fr/cards?id=like:${serie}&name=like:${searchValue}`)
    } else {
      return this.http.get<Card[]>(
        `https://api.tcgdex.net/v2/fr/cards?name=like:${encodeURIComponent(searchValue)}`
      ).pipe(
        switchMap(cards =>
          forkJoin(
            cards.map(card =>
              this.getCardById(card.id).pipe(
                switchMap(fullDataCard =>
                  this.getSetById(fullDataCard.set.id).pipe(
                    map(set => ({
                      ...fullDataCard,
                      cardCount: set ? { official: set.cardCount.official } : {},
                    }))
                  )
                )
              )
            )
          )
        )
      );
    }
  }

  getImageUrl(url: string, extension: string, quality?: string): string {
    if (quality) {
      return `${url}/${quality}.${extension}`;
    } else {
      return `${url}.${extension}`;
    }
  };


  //AINT WORKING
  // async fetchCard(category: any, id: string) {
  //   try {
  //     return await this.tcgdex.fetch(category, id);
  //   } catch (error) {
  //     console.error("Erreurs lors de la récupération de la carte : ", error)
  //     throw error
  //   }
  // }

}