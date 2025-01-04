import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { TCGdexService } from '../../services/tcgdex.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, AccordionModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  series: any = null;
  sets: any = null;
  loading = true;
  error: string | null = null;
  pokeball: string = '/assets/favicon.ico.png';

  constructor(private tcgdexService: TCGdexService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.sets = this.tcgdexService.getSets().subscribe({
      next: (setsData: any) => {
        this.sets = setsData.map((set: any) => ({
          ...set,
          logo: this.tcgdexService.getImageUrl(set.logo, 'png'),
        }))

        this.series = this.tcgdexService.getSeries().subscribe({
          next: (seriesData: any) => {
            this.series = seriesData
              .map((serie: any, index: number) => ({
                ...serie,
                index,
                logo: this.tcgdexService.getImageUrl(serie.logo, 'png'),
                sets: this.sets
                  .filter((set: any) => set.id.startsWith(serie.id))
                  .reverse()
              }))
              .reverse()
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Erreur lors de la récupération des séries :', err);
            this.loading = false;
            this.error = 'Impossible de charger les séries.';
          }
        });
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des sets :', err);
        this.loading = false;
        this.error = 'Impossible de charger les sets.';
      }
    });
  }

  getCardImage(localId: string, quality: string, extension: string): string {
    return this.tcgdexService.getImageUrl(localId, quality, extension);
  }

  navigateToSet(setId: string): void {
    this.router.navigate(['/set', setId]);
  }
}