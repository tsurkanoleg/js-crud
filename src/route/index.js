// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []; 

  constructor(name, price, description,) {   
    this.id = this.Math.floor(Math.random() * 90000) + 10000;
    this.createDate = new Date().toISOString();
    this.name = name;
    this.price = price;
    this.description = description;
  }
  
  getList() {
    return this.#list;
  }

  add(product) {
    this.#list.push(product);
  }

  getById(id) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      return this.#list.find(product => product.id === numericId);
    }
    return null;
  }

  updateById(id, data) {
    const product = this.getById(id);
    if (product) {
      if (data.name) product.name = data.name;
      if (data.price) product.price = data.price;
      if (data.description) product.description = data.description;
      return product;
    }
    return null;
  }

  deleteById(id) {
    const index = this.#list.findIndex(product => product.id === id);
    if (index !== -1) {
      this.#list.splice(index, 1);
      return true;
    }else {      
      return false;
    }
  }

  // static create = (product) => {
  //   this.#list.push(product)
  // }

}

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})


// router.get('/', function (req, res) {
//   res.render('index', {
//     style: 'index',
//   })
// })

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  console.log(req.body)
  res.render('product-create', {
    
    style: 'product-create',
  })
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  // const {name, price, description} = req.body;
  // const newProduct = new Product(name, price, description);

  res.render('product-create', {
    style: 'product-create',


  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-list', function (req, res) {
  res.render('product-list', {
    style: 'product-list',
  })
})

// ================================================================

router.get('/product-alert', function (req, res) {
  res.render('product-alert', {
    style: 'product-alert',
  })
})

// ================================================================

router.get('/product-edit', function (req, res) {
	
	res.render('product-edit', {		
	  style: 'product-edit',		
	})
  })
  
// ================================================================
  
router.post('/product-edit', function (req, res) {
	
	res.render('product-edit', {		
	  style: 'product-edit',		
	})
  })
  
// ================================================================
  
router.get('/product-edit', function (req, res) {
	
	res.render('product-edit', {		
	  style: 'product-edit',		
	})
  })
  
// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
