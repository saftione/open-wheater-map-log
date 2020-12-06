import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/login/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  bild1:string = 'assets/pwa.jpeg';
  bild2:string = 'assets/pedigree.png';
  bild3:string = 'assets/tree.png';
  bild4:string = 'assets/hintergrund4.png';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
