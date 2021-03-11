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

class Api {
    constructor() {
      this.url = '/goods.json'
    }

    fetch(error, callback) {
      var xhr;
    
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
    
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
          } else if (xhr.status > 400) {
            error();
          }
        }
      }
    
      xhr.open('GET', this.url, true);
      xhr.send();
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
      this.api = new Api();
      this.$goodsList = document.querySelector('.goods-list');
      this.goods = [];
      this.api.fetch(this.onFethError.bind(this), this.onFethCallback.bind(this))
    }

    onFethCallback(data) {
      this.goods = data.map(({title, price}) => new GoodsItem(title, price));
      this.render();
    }

    onFethError() {
      this.$goodsList.insertAdjacentHTML('beforeend', '<h3>Произошла ошибка</h3>');
    }

    getSumGoods() {
        let sum = 0;

        this.goods.forEach(function(obj){sum += obj.price;});
        console.log(this.goods);
        console.log(sum);
    }

    render() {
      this.$goodsList.textContent = '';
      this.goods.forEach((good) => {
          this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
      })
    }
}


    // Класс корзины
class Basket {
    constructor(){
      this.cartBlock = document.querySelector(`.${cartBlockClass}`);
    }
    
    // Метод очистки корзины
  dropBasket() {}

    // Рендер корзины
  render() {}

    // Добавить товар
  addToBasket() {
    const product = this.findProduct();

    if (product) {
      this.goods.push({...product});
      this.render();
    } else {
      alert('Ошибка добавления!');
    }
  }

    // Получение количества товаров в корзине
  getBasketGoodsLength() {}

    // Рендер пустой корзины
  renderEmptyBasket() {}

    //  Рендер списка товаров корзины.
  renderCartList() {
    this.cartBlock.innerHTML = '';
    this.goods.forEach(item => {
      this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item));
    });
  }
}

const goodsList = new GoodsList();

goodsList.getSumGoods();