// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];

// const $goodsList = document.querySelector('.goods-list');
  
// const renderGoodsItem = ({ title, price }) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };
  
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//             item => renderGoodsItem(item)
//         ).join('\n');

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
  
// renderGoodsList();

class ApiMock {
    constructor() {

    }

    fetch() {
      return [
          { title: 'Shirt', price: 150 },
          { title: 'Socks', price: 50 },
          { title: 'Jacket', price: 350 },
          { title: 'Shoes', price: 250 },
        ];
    }
}

class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    getHtml() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
      this.api = new ApiMock();
      this.$goodsList = document.querySelector('.goods-list');
      this.goods = [];
    }

    fetchGoods() {
      this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
      console.log(this.goods);
    }

    

    getSumGoods() {
        let sum = 0;

        this.goods.forEach(function(obj){sum += obj.price;});
        console.log(sum);
    }



    render() {
      this.$goodsList.textContent = '';
      this.goods.forEach((good) => {
          this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
      })
    }
}


//   Класс корзины
// class Basket {
//     constructor(){}
//     // Метод очистки корзины
//   dropBasket() {}
//     // Рендер корзины
//   render() {}
//     // Добавить товар
//   addToBasket() {}
//     // Получение количества товаров в корзине
//   getBasketGoodsLength() {}
//     // Рендер пустой корзины
//   renderEmptyBasket() {}
// }

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
goodsList.getSumGoods();