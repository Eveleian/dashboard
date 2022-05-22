import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { ModalSignupComponent } from '../modal-signup/modal-signup.component';
import {HttpClient} from '@angular/common/http';
import { ModalWidgetComponent } from '../modal-widget/modal-widget.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
interface Widget {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  static getWidgetFlow() {
    throw new Error('Method not implemented.');
    this.getWidgetFlow();
  }
  static getWidgetChannel(value: String) {
    throw new Error('Method not implemented.');
    this.getWidgetChannel(value)
  }
  static getWidgetVideo(value: String) {
    throw new Error('Method not implemented.');
    this.getWidgetVideo(value);
  }
  static getWidgetWeather(value: String) {
    throw new Error('Method not implemented.');
    this.getWidgetWeather(value);
  }

  constructor(public dialog: MatDialog,private http : HttpClient,private elementRef:ElementRef) {}
  
  isLoggedin: boolean = false;
  
  ngOnInit(): void {
    this.isLogin();
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(ModalLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSignup() {
    const dialogRef = this.dialog.open(ModalSignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAddWidget() {
    const dialogRef = this.dialog.open(ModalWidgetComponent);

  }
  logOut(): void {
    localStorage.removeItem("id");
    this.isLoggedin = false;
  }

  isLogin() {
    if(localStorage.getItem("id")){
      this.isLoggedin = true;
    }
  }

  deleteCard(){}

  widgets: Widget[] = [
    {value: 'weather-0', viewValue: 'Weather'},
    {value: 'youtube-0', viewValue: 'Youtube Channel'},
    {value: 'youtube-1', viewValue: 'Youtube Video'},
    {value: 'youtube-2', viewValue: 'Youtube Flow'},
  ];

@ViewChild('optionWidget') optionWidget!: ElementRef;
@ViewChild('valueWidget') valueWidget!: ElementRef;
selectedValue!: string;
    
  addWidget(){
    if(this.selectedValue == "weather-0"){
      this.getWidgetWeather(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-1"){
      this.getWidgetVideo(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-0"){
      this.getWidgetChannel(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-2"){
      this.getWidgetFlow();
    }
  }

  getWidgetVideo(idVideo : string){
    this.http.get<any>('http://localhost:8080/api/youtube/video/'+idVideo)
    .subscribe(Response => {
      if(Response){
        var bodyToWidget = this.elementRef.nativeElement.querySelector('.bodyToWidget');
        bodyToWidget.insertAdjacentHTML('beforeend',
        '<mat-card _ngcontent-rlj-c54="" style="max-width: 350px;margin: 1em;" class="mat-card mat-focus-indicator example-card"><mat-card-header _ngcontent-rlj-c54="" class="mat-card-header"><div _ngcontent-rlj-c54="" mat-card-avatar="" class="mat-card-avatar example-header-image"></div><div class="mat-card-header-text"><mat-card-title _ngcontent-rlj-c54="" class="mat-card-title">'+
        Response.items[0].snippet.channelTitle+'</mat-card-title><mat-card-subtitle _ngcontent-rlj-c54="" class="mat-card-subtitle">'+
        Response.items[0].snippet.channelId+' channel id<br/>'+
        '</mat-card-subtitle></div></mat-card-header><img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[0].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[0].snippet.title+'<br/><br/>'+
        'Description : '+Response.items[0].snippet.description+'<br/><br/>'+
        Response.items[0].statistics.viewCount+' views<br/>'+
        Response.items[0].statistics.likeCount+' likes'+
        ' </p></mat-card-content><mat-card-actions _ngcontent-rlj-c54="" class="mat-card-actions">'+
        '</mat-card-actions></mat-card>'
        );
      }
    });
  }

  getWidgetChannel(idChannel: string){
    this.http.get<any>('http://localhost:8080/api/youtube/channel/'+idChannel)
    .subscribe(Response => {
      if(Response){
        var bodyToWidget = this.elementRef.nativeElement.querySelector('.bodyToWidget');
        bodyToWidget.insertAdjacentHTML('beforeend',
        '<mat-card _ngcontent-rlj-c54="" style="max-width: 350px;margin: 1em;" class="mat-card mat-focus-indicator example-card"><mat-card-header _ngcontent-rlj-c54="" class="mat-card-header"><div _ngcontent-rlj-c54="" mat-card-avatar="" class="mat-card-avatar example-header-image"></div><div class="mat-card-header-text"><mat-card-title _ngcontent-rlj-c54="" class="mat-card-title">'+
        Response.items[0].snippet.channelTitle+'</mat-card-title><mat-card-subtitle _ngcontent-rlj-c54="" class="mat-card-subtitle">'+
        Response.pageInfo.totalResults+' videos<br/>'+
        Response.items[0].snippet.channelId+' channel id<br/>'+
        '</mat-card-subtitle></div></mat-card-header>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[0].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[0].snippet.title+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[1].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[1].snippet.title+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[2].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[2].snippet.title+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[3].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[3].snippet.title+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[4].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[4].snippet.title+
        ' </p></mat-card-content>'+
        '<mat-card-actions _ngcontent-rlj-c54="" class="mat-card-actions">'+
        '</mat-card-actions></mat-card>'
        );
      }
    });
  }

  getWidgetFlow(){
    this.http.get<any>('http://localhost:8080/api/youtube')
    .subscribe(Response => {
      if(Response){
        var bodyToWidget = this.elementRef.nativeElement.querySelector('.bodyToWidget');
        bodyToWidget.insertAdjacentHTML('beforeend',
        '<mat-card _ngcontent-rlj-c54="" style="max-width: 350px;margin: 1em;" class="mat-card mat-focus-indicator example-card"><mat-card-header _ngcontent-rlj-c54="" class="mat-card-header"><div _ngcontent-rlj-c54="" mat-card-avatar="" class="mat-card-avatar example-header-image"></div><div class="mat-card-header-text"><mat-card-title _ngcontent-rlj-c54="" class="mat-card-title">'+
        'Youtube Flow</mat-card-title><mat-card-subtitle _ngcontent-rlj-c54="" class="mat-card-subtitle">'+
        '</mat-card-subtitle></div></mat-card-header>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[0].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[0].snippet.title+'<br/>'+
        'Channel : '+Response.items[0].snippet.channelTitle+'<br/>'+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[1].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[1].snippet.title+'<br/>'+
        'Channel : '+Response.items[1].snippet.channelTitle+'<br/>'+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[2].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[2].snippet.title+'<br/>'+
        'Channel : '+Response.items[2].snippet.channelTitle+'<br/>'+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[3].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[3].snippet.title+'<br/>'+
        'Channel : '+Response.items[3].snippet.channelTitle+'<br/>'+
        ' </p></mat-card-content>'+
        '<br><hr width="85%" color="black" size="1" noshade="noshade" align="center" class="style1" /><br>'+
        '<img _ngcontent-rlj-c54="" mat-card-image="" src="'+
        Response.items[4].snippet.thumbnails.high.url+'" alt="video" class="mat-card-image"><mat-card-content _ngcontent-rlj-c54="" class="mat-card-content"><p _ngcontent-rlj-c54=""> '+
        'Title : '+Response.items[4].snippet.title+'<br/>'+
        'Channel : '+Response.items[4].snippet.channelTitle+'<br/>'+
        ' </p></mat-card-content>'+
        '<mat-card-actions _ngcontent-rlj-c54="" class="mat-card-actions">'+
        '</mat-card-actions></mat-card>'
        );
      }
    });
  }

  getWidgetWeather(city: string){
    this.http.get<any>('http://localhost:8080/api/weather?city='+city)
    .subscribe(Response => {
      if(Response){
        var bodyToWidget = this.elementRef.nativeElement.querySelector('.bodyToWidget');
        bodyToWidget.insertAdjacentHTML('beforeend',
        '<mat-card _ngcontent-jms-c54="" class="mat-card mat-focus-indicator example-card" style="max-width: 350px;margin: 1em;background: #4567F7 !important;"><mat-card-header _ngcontent-jms-c54="" class="mat-card-header" style="justify-content: center;"><div class="mat-card-header-text"><mat-card-title _ngcontent-jms-c54="" style="color:white;" class="mat-card-title">Weather</mat-card-title></div></mat-card-header><mat-card-content style="margin-top: 8px;" _ngcontent-jms-c54="" class="mat-card-content"><h4 _ngcontent-jms-c54="" id="city" style="color: white !important;">' + Response.name + ", " + Response.sys.country + '</h4><p _ngcontent-jms-c54="" id="weather" style="color: white;">' + Math.round((+(Response.main.temp) - 32.0) * 5.0 / 9.0) + "°C - " + Response.weather[0].description +'</p></mat-card-content><mat-card-actions _ngcontent-jms-c54="" class="mat-card-actions" style="display: flex;justify-content: space-between;""></mat-card-actions></mat-card>'
        );
      }
    });
  }
}


