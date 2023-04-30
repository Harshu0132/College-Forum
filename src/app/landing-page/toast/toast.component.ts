import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        animate('300ms ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(-20px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition(':leave', [
        animate('300ms ease-out', keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(-20px)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'success';
  constructor() { }

  ngOnInit(): void {
  }

  get toastClass() {
    return `toast toast-${this.type}`;
  }

  get animationState() {
    return this.type === 'success' ? 'show' : 'hide';
  }

}
