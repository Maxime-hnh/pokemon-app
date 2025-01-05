import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Serie } from "../interfaces/serie.interface";
import { Set } from "../interfaces/set.interface";
import { Observable } from "rxjs";
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

  searchCard(searchValue: string, serie: string): any {
    return this.http.get<Card[]>(`https://api.tcgdex.net/v2/fr/cards?id=like:${serie}&name=like:${searchValue}`)
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