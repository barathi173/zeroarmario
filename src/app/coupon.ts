import { AngularFirestore } from "@angular/fire/firestore";

export class Coupon {
    id: string;
    code: string;
    expire: Object;
    offer: number;
}
