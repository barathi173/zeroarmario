export class Product {
    host: string = "http://localhost:4200/"
    id!: string;
    name!: string;
    images!: string[];
    category!: string[];
    price!: number;
    color!:string;
    avail!:string[];
    description!:Map<string,string>
    size!:Map<string,number>
}
