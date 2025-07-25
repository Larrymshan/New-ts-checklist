import ListItem from './ListItem';

interface List{
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    add(itemObj: ListItem): void
    removeItem(id: string): void;
}

export default class FullList implements List{
    
    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list;
    }

    load(): void{
        const storedList: string | null = localStorage.get('thisList');

        if(typeof storedList !== 'string'){
            return;
        }

        const parsedList: {_id: string, _item: string, _completed: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._completed);
            FullList.instance.add(newListItem);
        })

    }

    save():void {
        localStorage.setItem('thisList', JSON.stringify(this._list));
    }

    clearList():void{
        this._list = [];
        this.save();
    }

    add(itemObj: ListItem): void{
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void{
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}