import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Tweet } from '../model/tweet.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchCretiria } from '../model/searchCretiria.model';

const api = {
  fetchPage: '/api/tweets',
  nextPage:'/api/nextPage'
};

@Injectable()
export class TwitterApiService {

  constructor(private httpClient: HttpClient) {}

  getTweetesByPage(
    pageSize: number,
    search: SearchCretiria
  ) {
    let searchParams = {count: `${pageSize}`, lang: search.language.value, q: search.hintSearch, result_type: search.tweetType.value}

    return this.httpClient.get(`${environment.serverUrl}${api.fetchPage}`, {params: searchParams}).pipe(
        map((response: any) => {
            if (response && response.data ) {
                const tweets: Tweet[] = response.data.statuses;
                return {result: tweets, nextPage: response.data.search_metadata!.next_results};
            }
        })
    );
  }

  loadNext(
    url: string,
  ) {

    console.log('next', url)

    return this.httpClient.get(`${environment.serverUrl}${api.nextPage}`, {params: {url: url}}).pipe(
        map((response: any) => {
          console.log('response is', response);
          if (response && response.data) {
              const tweets: Tweet[] = response.data.statuses;
              return {result: tweets, nextPage: response.data.search_metadata!.next_results};
          }
        })
    );
  }

}
