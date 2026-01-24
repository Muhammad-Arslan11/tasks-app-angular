import { Component } from '@angular/core';
import { HeaderComponent } from './Header/header.component';
import { FooterComponent } from './Footer/footer.component';
import { DashboardComponent } from './Dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone:true,
  imports:[HeaderComponent, FooterComponent, DashboardComponent]
})
export class App {
  title = 'angular-http-client';
}