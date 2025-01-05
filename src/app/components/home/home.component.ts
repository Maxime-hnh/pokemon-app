import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { TCGdexService } from '../../services/tcgdex.service';
import { Set } from '../../interfaces/set.interface';
import { Serie } from '../../interfaces/serie.interface';
import { Observable, Subscription, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, AccordionModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sets$: Observable<Set[]> | null = null;
  series$: Observable<Serie[]> | null = null;
  loading = true;
  error: string | null = null;
  pokeball: string = '/assets/favicon.ico.png';

  constructor(private tcgdexService: TCGdexService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.sets$ = this.tcgdexService.getSets().pipe(
      map((setsData: Set[]) =>
        setsData.map((set: Set) => ({
          ...set,
          logo: this.tcgdexService.getImageUrl(set.logo, 'png'),
        }))
      )
    );

    this.series$ = this.sets$.pipe(
      switchMap((sets: Set[]) =>
        this.tcgdexService.getSeries().pipe(
          map((seriesData: Serie[]) =>
            seriesData.map((serie: Serie, index: number) => ({
              ...serie,
              index,
              logo: this.tcgdexService.getImageUrl(serie.logo, 'png'),
              sets: sets
                .filter((set: Set) => set.id.startsWith(serie.id))
            }))
          )
        )
      )
    );
  }

  navigateToSet(setId: string): void {
    this.router.navigate(['/set', setId]);
  }
}