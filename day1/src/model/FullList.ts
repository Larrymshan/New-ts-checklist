import listItem from './ListItem';

interface List{
    list: listItem[],
    load(): void,
    save(): void,
    clear(): void,
    add(item: listItem): void
    removeItem(id: string): void;
}

export default class FullList implements List{
    
    static instance: FullList = new FullList();

    private constructor(private _list: listItem[] = []){}

    get list(): listItem[] {
        return this._list;
    }

    load(): void{
        const storedList: string | null = localStorage.get('thisList');

        if(storedList !== 'string'){
            return;
        }

        const parsedList: {_id: string, _item: string, _completed: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(item => {
            const newListItem = new listItem(item._id, item._item, item._completed);
            FullList.instance.add(newListItem);
        })

    }

    save():void {
        localStorage.setItem('thisList', JSON.stringify(this._list));
    }

    clear():void{
        this._list = [];
        this.save();
    }

    add(item: listItem): void{
        this._list.push(item);
        this.save();
    }

    removeItem(id: string): void{
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}