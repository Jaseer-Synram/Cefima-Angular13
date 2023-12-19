import { Injectable, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";

@Injectable({
  providedIn: "root",
})
export class EventEmitterService {
  invokeFirstComponentFunction = new EventEmitter();
  unreadChatMessageEvent = new EventEmitter();
  unreadChatMessageCloseEvent = new EventEmitter();
  subsVar: Subscription;
  unreadMessageOpen: Subscription;
  unreadMessageClose: Subscription;

  constructor() {}

  onFirstComponentButtonClick(message: any) {
    this.invokeFirstComponentFunction.emit(message);
  }

  unreadChatMessage() {
    this.unreadChatMessageEvent.emit();
  }

  unreadChatMessageClose() {
    this.unreadChatMessageCloseEvent.emit();
  }
}
