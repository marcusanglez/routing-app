import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent {
  @Input()
  setId(id:string){
    // this.localVar =  someService.getSomeObject(id)
  }

}
