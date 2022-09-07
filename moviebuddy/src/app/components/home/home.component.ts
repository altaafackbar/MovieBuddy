import { Component, OnDestroy, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort!: string;
  public order!: string;
  public movies!: Array<Movie>;
  public index: number = 1;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
this.activatedRoute.params.subscribe((params: Params) => {
      if(params['movie-search']){
        this.searchMovies(params['movie-search']);
      } else{
        this.searchMovies('');
      }
    });
  }


  searchMovies(search: string): void{
this.httpService
    .getMovieList(search)
    .subscribe((movieList: APIResponse<Movie>) => {
      this.movies = movieList.results;
      console.log(this.movies);
    })
  }


  sortMovies(ordering: string): void{
    console.log(ordering);
    this.order = ordering;
    if(ordering == "name"){
      console.log("1");
      this.movies.sort((a,b) => a.title.localeCompare(b.title));
    }
    else if(ordering == "-rating"){
      console.log("2");
      this.movies.sort(function(a, b) {
        return parseFloat(b.vote_average) - parseFloat(a.vote_average);
    });
    }
    else if(ordering == "-released"){
      console.log("3");
      console.log(typeof(this.movies[1].vote_average));
      this.movies.sort((a,b) => a.release_date.localeCompare(b.release_date));
    }
    


  }

  openMovieDetails(id: string): void{

    this.router.navigate(['details', id]);

  }

  loadMovies(): void{
    
    this.httpService
    .getMovieList(String(this.index))
    .subscribe((movieList: APIResponse<Movie>) => {
      movieList.results.forEach(element => {
        this.movies.push(element);
      });

      console.log(this.movies);
    })
    console.log(this.order);
    this.index = this.index + 1;
    
    if(this.order == "name"){
      this.sortMovies("name");
    }
    else if(this.order == "-rating"){
      this.sortMovies("-rating");
    }
    else if(this.order == "-released"){
      this.sortMovies("-released");
    }
    console.log("clicked");
    this.cdr.detectChanges();
  }
}
