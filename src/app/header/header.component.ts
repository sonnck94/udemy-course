import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-stograge.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
@Component({
  selector: `app-header`,
  templateUrl: './header.component.html',
  styles: [
    `.nav-link:hover{
      cursor: pointer;
    }`
  ]
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated: boolean = false;
  userSubcription: Subscription;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService){
  }
  ngOnInit(){
    this.userSubcription = this.authService.user.subscribe(
      (user: User) => {
        this.isAuthenticated = !!user;
      }
    )
  }

  ngOnDestroy(){
    this.userSubcription.unsubscribe();
  }

  onLogOut(){
    this.authService.logout();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){    
    this.dataStorageService.getRicepes().subscribe();
  }
}
