import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-tabs',
  templateUrl: './movie-tabs.component.html',
  styleUrls: ['./movie-tabs.component.scss']
})
export class MovieTabsComponent implements OnInit {
  @Input() movie!: Movie;
  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
  }

  getEmbedURL(id: string){

    console.log(`https://www.youtube.com/embed/${id}`);

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
  }

}
