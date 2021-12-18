import _ from 'lodash';
export class PaginationHelper{
    public dataSource;
    public totalcount : number = 0
    constructor(){
    }

    nextPage(perPage: number, page : number) : any{
        let startIndex = (page-1) * perPage;
        let endIndex =  perPage*page;
        console.log('---------------Pagination--------------',startIndex, endIndex, page)
        return _.slice(this.dataSource, startIndex, endIndex);
    }
    doSearch( searchTxt: string ): any{
        console.log('----------------------------------', this.dataSource);
        searchTxt = String(searchTxt).trim().toLowerCase();
        return _.filter(this.dataSource,(data)=>{
            return String(data?.category).trim().toLowerCase().match(searchTxt) || String(data?.subCate).trim().toLowerCase().match(searchTxt);
        });
    }
}