import { Component, OnInit } from '@angular/core';

import { PrimeIcons, MenuItem } from 'primeng/api';

import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MenubarModule],
  template: `
  <div id="root">
    <p-menubar [model]="items"></p-menubar>
    <div class="root_container">
      <router-outlet></router-outlet>
    </div>
  </div>
`,
})

export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor( private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.items = [
      {
        label: 'Accueil',
        icon: PrimeIcons.HOME,
        command : () => this.navigateToSet()
      },
      {
        label: 'Collection',
        icon: PrimeIcons.CLIPBOARD,
        // items: [
        //   { label: 'New', icon: 'pi pi-plus'},
        //   { label: 'Open', icon: 'pi pi-folder-open' },
        // ],
      },
    ];
  }

  navigateToSet(): void {
    this.router.navigate(['/']);
  }
}
