import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models';

@Component({
  selector: 'app-movie-tabs',
  templateUrl: './movie-tabs.component.html',
  styleUrls: ['./movie-tabs.component.scss']
})
export class MovieTabsComponent implements OnInit {
  @Input() movie!: Movie;
  constructor() { }

  ngOnInit(): void {
  }

}
