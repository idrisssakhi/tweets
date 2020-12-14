import { Component, OnInit } from '@angular/core';
import { TwitterApiService } from '../service/twitter-api.service';
import { Tweet } from '../model/tweet.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCretiria } from '../model/searchCretiria.model';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
  registerForm!: FormGroup;
  
  /**
   * Current tweets
   */
  currentsTweets: Tweet[] = [];
  placeholders = [];
  pageSize = 20;
  pageToLoadNext = '';
  loading = true;

  tweets: Tweet[] = [
    {
      created_at: 'this is mocked data',
      id: 0,
      text: 'created only for test purpuses',
      truncated: false,
      entities:'',
      source:'follow',
      user: {
        name: 'test',
        followers_count: 300,
      }
    }
  ]

  languages = [
    {value: 'fr', placeholder: 'FRENSH'},
    {value: 'en', placeholder: 'ENGLISH'},
    {value: 'ar', placeholder: 'ARABIC'}
  ];

  tweetTypes = [
    {value: 'mixed', placeholder: 'ALL'},
    {value: 'popular', placeholder: 'ONLY FAMOUS'},
    {value: 'recent', placeholder: 'RECENT TWEETS'}
  ];

  constructor(private twitterService: TwitterApiService,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.currentsTweets = this.tweets;

    this.registerForm = this.formBuilder.group({
      hintSearch: new FormControl('', [Validators.required]),
      tweetType: new FormControl(undefined, [Validators.required]),
      language: new FormControl(undefined, [Validators.required]),
  });
  }

  search() {
    this.currentsTweets = [];
    this.loading = true;

    const searchCretiria = this.registerForm.value as SearchCretiria;

    this.twitterService.getTweetesByPage(this.pageSize, searchCretiria)
      .subscribe(tweets => {
        this.currentsTweets.push(...tweets.result);
        this.loading = false;
        this.pageToLoadNext = tweets.nextPage;
      });
  }


  loadNext() {
    console.log('in here to reload', this.pageToLoadNext);
    if (this.loading || !!!this.pageToLoadNext) { return }

    console.log('in here to reload');

    this.loading = true;
    this.twitterService.loadNext(this.pageToLoadNext)
      .subscribe(tweets => {
        this.currentsTweets.push(...tweets!.result);
        this.loading = false;
        this.pageToLoadNext = tweets.nextPage;
      });
  }

}
