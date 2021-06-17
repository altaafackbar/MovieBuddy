import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { forkJoin, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Movie } from '../models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private m!: Array<APIResponse<Movie>>;
  constructor(private http: HttpClient) { }

  getMovieList(
    search: string,
  ): Observable<APIResponse<Movie>> {

    if (search) {

      return this.http.get<APIResponse<Movie>>(`${env.BASE_URL}search/movie?api_key=${env.TMDB_API_KEY}&query=${search}`);
    }else{
      return this.http.get<APIResponse<Movie>>(`${env.BASE_URL}movie/popular?api_key=${env.TMDB_API_KEY}`);
    }
    
  }

  getMoreMovies(
    index: string,
  ): Observable<APIResponse<Movie>> {


      return this.http.get<APIResponse<Movie>>(`${env.BASE_URL}search/movie?api_key=${env.TMDB_API_KEY}&query=${index}&page=${index}`);

    
  }

  getMovieDetails(id: string): Observable<Movie> {

    const movieInfoRequest = this.http.get<APIResponse<Movie>>(`${env.BASE_URL}movie/${id}?api_key=${env.TMDB_API_KEY}`);
    const movieTrailerRequest = this.http.get<APIResponse<Movie>>(`${env.BASE_URL}movie/${id}/videos?api_key=${env.TMDB_API_KEY}`);
    const movieScreenshotsRequest = this.http.get<APIResponse<Movie>>(`${env.BASE_URL}movie/${id}/images?api_key=${env.TMDB_API_KEY}`);

    return forkJoin({
      movieInfoRequest,
      movieTrailerRequest,
      movieScreenshotsRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['movieInfoRequest'],
          screenshots: resp['movieScreenshotsRequest']?.results,
          trailers: resp['movieTrailerRequest']?.results[0].key,
        };
      })
    )
  }
}
