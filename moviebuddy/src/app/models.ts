export interface Cast {
    name: string;
    id: string;
    profile_path: string;
    character?: string;


}

export interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: Array<Genre>;
  vote_average: string;
  vote_count: string;
  id: string;
  trailers: string;
  screenshots: string;
  budget: string;
  cast: Array<Casts>;

}

export interface APIResponse<T> {
    results: Array<T>;
}

interface Genre {
    name: string;
  }




  interface Rating {
    id: number;
    count: number;
    title: string;
  }

  export interface Casts {
    name: string;
    id: string;
    title: string;
    profile_path: string;


}