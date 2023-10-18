/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books.
2. Реализуйте геттер allBooks, который возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    #books = new Set();

    constructor(books) {
        if (!this.#Duplicates(...books))
            throw new Error('Найден дубликат!');

        //this.#books = books;
        books.forEach(book => this.#books.add(book));
    }

    #Duplicates(...arr) {
        return arr.length === new Set(arr).size;
    }

    get allBooks() {
        return this.#books;
    }

    hasBook(title) {
        return this.#books.has(title);
    }

    addBook(title) {
        if (this.hasBook(title)) {
            throw new Error(`${title} не добавлен, в библиотеке существует`);
        }
        this.#books.add(title);
    }

    removeBook(title) {
        if (!this.hasBook(title)) {
            throw new Error(`Книга не найдена ${title}`);
        }
        this.#books.delete(title);
    }

}


books = ["Тарзан", "Колобок", "Репка", "Гуси и лебеди"];
const library = new Library(books);

try {
    console.log(library.allBooks);
}
catch (e) {
    console.log(e.message);
}

try {
    console.log(library.addBook("Тимур и его команда"));
}
catch (e) {
    console.log(e.message);
}

try {
    console.log(library.removeBook("Колобок"));
}
catch (e) {
    console.log(e.message);
}

try {
    console.log(library.removeBook("Тарзан"));
}
catch (e) {
    console.log(e.message);
}

try {
    console.log(library.allBooks);
}
catch (e) {
    console.log(e.message);
}



