import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCards',
})
export class FilterCardsPipe implements PipeTransform {
  transform(cards: any[], searchValue: string): any[] {
    if (!searchValue) {
      return cards;
    }
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return cards.filter(card =>
      card.name.toLowerCase().startsWith(lowerCaseSearchValue)
    );
  }
}
