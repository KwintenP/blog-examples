import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.css']
})
export class GenderFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  genderValueChanged(event: any) {
    this.filterChange.emit(event.target.value);
  }

}
