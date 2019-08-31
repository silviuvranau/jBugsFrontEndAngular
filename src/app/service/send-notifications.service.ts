import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

export const environment = {
  production: true,
  URL: 'ws://echo.websocket.org/'
}

export interface Message{
  type: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SendNotificationsService {


  public messages: Subject<Message>;

  constructor(private websocketService: WebsocketService) {
    this.messages = <Subject<Message>> websocketService
      .connect(environment.URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          type: data.type,
          text: data.text
        }
      })
   }
}
