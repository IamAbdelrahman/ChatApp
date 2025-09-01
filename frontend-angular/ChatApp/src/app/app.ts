import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login";
import { RegisterComponent } from "./auth/register/register";
import { ChatWindowComponent } from './chat/chat-window/chat-window';
import { ChatListComponent } from './chat/chat-list/chat-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent, ChatWindowComponent,
    ChatListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ChatApp';
}
