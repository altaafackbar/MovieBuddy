import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movieId!: string;
  movie!: Movie;


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params:Params) => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
    })
  }

  getMovieDetails(id: string): void{
    this.httpService
        .getMovieDetails(id)
        .subscribe((movieResp: Movie) => {
          this.movie = movieResp;
          console.log('1st');
          console.log(this.movie);
        })
      }
      

      

}
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 
