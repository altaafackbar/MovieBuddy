import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public movies!: Array<Movie>;
  public index: number = 1;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

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
    if(ordering == "name"){
      console.log("1");
      this.movies.sort((a,b) => a.title.localeCompare(b.title));
    }
    else if(ordering == "-rating"){
      console.log("2");
      this.movies.sort((a,b) => a.vote_average.localeCompare(b.vote_average));
    }
    else if(ordering == "-released"){
      console.log("3");
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
    this.index = this.index + 1;
    console.log("clicked");
  }
}
