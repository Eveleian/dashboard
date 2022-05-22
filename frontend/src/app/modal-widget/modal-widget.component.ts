import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccueilComponent } from 'app/accueil/accueil.component';

interface Widget {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-modal-widget',
  templateUrl: './modal-widget.component.html',
  styleUrls: ['./modal-widget.component.css']
})
export class ModalWidgetComponent{
    widgets: Widget[] = [
      {value: 'weather-0', viewValue: 'Weather'},
      {value: 'youtube-0', viewValue: 'Youtube Channel'},
      {value: 'youtube-1', viewValue: 'Youtube Video'},
      {value: 'youtube-2', viewValue: 'Youtube Flow'},
    ];

  @ViewChild('optionWidget') optionWidget!: ElementRef;
  @ViewChild('valueWidget') valueWidget!: ElementRef;
  selectedValue!: string;
  
  constructor(public dialog: MatDialog,private http : HttpClient,private elementRef:ElementRef) {}

    accueilComponent !: AccueilComponent;

  addWidget(){
    if(this.selectedValue == "weather-0"){
      this.accueilComponent.getWidgetWeather(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-1"){
      this.getWidgetVideo(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-0"){
      this.accueilComponent.getWidgetChannel(this.valueWidget.nativeElement.value);
    }else if(this.selectedValue == "youtube-2"){
      this.accueilComponent.getWidgetFlow();
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
        '<button _ngcontent-rlj-c54="" mat-button="" class="mat-focus-indicator mat-button mat-button-base"><span class="mat-button-wrapper">LIKE</span><span matripple="" class="mat-ripple mat-button-ripple"></span><span class="mat-button-focus-overlay"></span></button>'+
        '<button _ngcontent-rlj-c54="" mat-button="" class="mat-focus-indicator mat-button mat-button-base"><span class="mat-button-wrapper">SHARE</span><span matripple="" class="mat-ripple mat-button-ripple"></span><span class="mat-button-focus-overlay"></span></button>'+
        '</mat-card-actions></mat-card>'
        );
      }
    });
  }
}
