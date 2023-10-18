"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. На странице должны отображаться все товары и отзывы 
под каждым товаром. Под каждым блоком отзывов, должна быть возможность добавить 
отзыв для конкретного продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.
*/

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: 1,
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: 2,
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: 3,
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: 4,
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

let currentReviewId = initialData.reduce((max, review) => {
    const maxReviewId = review.reviews.reduce((a, r) => a > r.id ? a : r.id, 0);
    return Math.max(max, maxReviewId);
}, 0);

const selectProduct = document.querySelector("#selectProduct");

initialData.forEach(item => {
    const field = `<option value="${item.product}">${item.product}</option>`;
    selectProduct.insertAdjacentHTML("beforeend", field);
});


const productList = document.querySelector("#productList");

const showProductList = () => {
    productList.innerHTML = "";
    initialData.forEach(item => {
        const title = `<h2>${item.product}</h2>`;
        const subtitle = `${item.reviews.reduce((str, review) => str + "<p>" + review.text + "</p>", "")}`;
        const str = title + subtitle;
        productList.insertAdjacentHTML("beforeend", str);
    });
}
showProductList();

const frmerr = document.querySelector("#error");

const ErrorMessage = (err) => {
    frmerr.textContent = err ? err : "";
}



const form = document.querySelector("#form");
const msg = document.querySelector("#message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    ErrorMessage();

    try {
        if (!initialData.some(item => item.product === selectProduct.value)) {
            throw new Error("Товар не выбран!");
        }

        if (msg.value.length < 50 || msg.value.length > 500) {
            throw new Error("Не менее 50 символов в длину и не более 500");
        }

        const SelectedProduct = initialData.find(el => el.product === selectProduct.value);
        SelectedProduct.reviews.push({ id: ++currentReviewId, text: msg.value });
    }
    catch (e) {
        ErrorMessage(e.message);
    } finally {
        showProductList();
    }


});


