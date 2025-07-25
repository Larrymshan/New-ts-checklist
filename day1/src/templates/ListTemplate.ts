import FullList from '../model/FullList';

interface DOMElements {
    ul: HTMLUListElement,
    clear(): void,
    render(list: FullList): void
}

export default class ListTemplate implements DOMElements{

    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }

    clear(): void{
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void{
        this.clear();
        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            const check = document.createElement('input') as HTMLInputElement;
            check.type = 'checkbox';
            check.checked = item.completed;
            check.id = item.id
            li.append(check)

            check.addEventListener('change', () => {
                item.completed = !item.completed;
                fullList.save();
            })

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement('button') as HTMLButtonElement;
            button.textContent = 'X';
            button.className = 'button';
            li.append(button);

            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })
            this.ul.append(li);
        })
    }

}