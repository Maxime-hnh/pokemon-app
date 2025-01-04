import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import TCGdex from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})

export class TCGdexService {
  private tcgdex: TCGdex;

  constructor(private http: HttpClient) {
    this.tcgdex = new TCGdex('fr');
  }
  getSets() {
    return this.http.get<any>('https://api.tcgdex.net/v2/fr/sets')
  };

  getSeries() {
    return this.http.get<any>('https://api.tcgdex.net/v2/fr/series')
  };

  getSetById(setId: string) {
    return this.http.get<any>(`https://api.tcgdex.net/v2/fr/sets/${setId}`)
  };

  getImageUrl(url: string, extension: string, quality?: string): string {
    if (quality) {
      return `${url}/${quality}.${extension}`;
    } else {
      return `${url}.${extension}`;
    }
  };


  //AINT WORKING
  async fetchCard(category: any, id: string) {
    try {
      return await this.tcgdex.fetch(category, id);
    } catch (error) {
      console.error("Erreurs lors de la récupération de la carte : ", error)
      throw error
    }
  }

}