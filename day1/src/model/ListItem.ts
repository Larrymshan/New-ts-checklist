export interface Item {
    id: string,
    item: string,
    completed: boolean,
}

export default class ListItem implements Item {

    constructor(
        private _id: string = '',
        private _item: string = '',
        private _completed: boolean = false
    ){}

    get id(): string{
        return this._id;
    }

    set id(id: string){
        this._id = id;
    }

    get item(): string{
        return this._item;
    }

    set item(item: string){
        this._item = item;
    }

    get completed():boolean{
        return this._completed;
    }

    set completed(completed: boolean){
        this._completed = completed;
    }
}