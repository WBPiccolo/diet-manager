import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'homepage-component',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private dietService: DietService) {}
  dietData: Observable<any> = new Observable();

  ngOnInit(): void {
    this.dietData = this.dietService.getDietData();
  }
}
