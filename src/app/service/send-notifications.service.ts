import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebsocketService} from './websocket.service';

export const environment = {
  production: true,
  URL: 'ws://echo.websocket.org/'
}

export interface Message {
  page: string,
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SendNotificationsService {


  public messages: Subject<Message>;

  constructor(private websocketService: WebsocketService) {
    this.messages = <Subject<Message>>websocketService
      .connect(environment.URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          page: data.page,
          id: data.id
        }
      })
  }
}
