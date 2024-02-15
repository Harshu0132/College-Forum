// // share-modal.component.ts
// import { Component, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//     selector: 'app-share-modal',
//     template: `
//         <div class="modal-header">
//             <h5 class="modal-title" id="shareModalLabel">Share</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss('Cross click')">
//                 <span aria-hidden="true">&times;</span>
//             </button>
//         </div>
//         <div class="modal-body">
//             <div class="row">
//                 <div class="col text-center">
//                     <!-- WhatsApp Share Button -->
//                     <button class="btn btn-success" (click)="shareOnWhatsApp(item)">Share on WhatsApp</button>
//                 </div>
//                 <div class="col text-center">
//                     <!-- Telegram Share Button -->
//                     <button class="btn btn-dark" (click)="shareOnTwitter(item)">Share on Twitter</button>
//                 </div>
//                 <div class="col text-center">
//                     <!-- Instagram Share Button -->
//                     <button class="btn btn-primary" (click)="shareOnTelegram(item)">Share on Telegram</button>
//                 </div>
//             </div>
//         </div>
//     `,
// })
// export class ShareModalComponent {
//     @Input() item: any;

//     constructor(public modal: NgbActiveModal) {} // Inject NgbActiveModal if using NgbModal
// }
