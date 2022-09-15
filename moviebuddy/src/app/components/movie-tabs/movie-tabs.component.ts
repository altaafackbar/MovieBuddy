import { Input } from '@angular/core';
import { Component, OnDestroy, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Movie, Cast, APIResponse } from 'src/app/models';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-tabs',
  templateUrl: './movie-tabs.component.html',
  styleUrls: ['./movie-tabs.component.scss']
})
export class MovieTabsComponent implements OnInit {
  @Input() movie!: Movie;
  public casts!: Array<Cast>;
  movieId!: string;


  constructor(
    private sanitizer: DomSanitizer,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    
    ) { 
    
  }


  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params:Params) => {
      this.movieId = params['id'];
      this.casts = this.movie.cast.slice(0,20);
      
      
      //this.getCastList(this.movieId);
    })

  }



  getEmbedURL(id: string){

    console.log(`https://www.youtube.com/embed/${id}`);
    console.log(this.casts)
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
  }

}
