import { Component } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  greetings: string[] = [];
  disabled = true;
  private stompClient = new SockJS('http://localhost:8081/socket');
  constructor(){}
  public msg = [];
  title = 'websocket-frontend';
  input = "";

  sendMessage() {
    if (this.input) {
      this.sendMessage1(this.input);
      this.input = '';
    }
  }

  ngOnInit() {
    this.connect();
  }

  connect() {
    const serverUrl = 'http://localhost:8081/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(<WebSocket> ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage1(message) {
    this.stompClient.send('/app/send/message' , {}, message);
  }

}
