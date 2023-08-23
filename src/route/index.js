// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []; 

  constructor(name, price, description,) {   
	this.id = Math.floor(Math.random() * 100000);
	this.createDate = () => {
		this.date = new Date().toISOString()
	  }
    this.name = name;
    this.price = price;
    this.description = description;
  }
  
  static getList = () => this.#list;
  checkId = (id) => this.id === id

  static add = (product) => {
    this.#list.push(product);
  }

  static getById = (id) =>
  this.#list.find((product) => product.id === id)

  // static updateById = (id, data) => {
  // const product = this.getById(id)
  // }

	static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
	}

  static updateById(id, data) {
    const product = this.getById(id);
    if (product) {
      if (data.name) product.name = data.name;
      if (data.price) product.price = data.price;
      if (data.description) product.description = data.description;
      return product;
    } else {
      return false;
    }
        
  }




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
router.post('/product-create', function (req, res) {
  console.log(req.body)
  res.render('product-create', {
    
    style: 'product-create',
  })
})


// ================================================================

router.get('/product-list', function (req, res) {
  const list = Product.getList()
  console.log(list)
  res.render('product-list', {
    style: 'product-list',
    data:{
      product:{
        list,
        isEmpty: list.length === 0
      }
    }
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
  const { id } = req.query
  const product = Product.getById(Number(id))
	
  if (product) {
    return res.render('product-edit', {
        style: 'product-edit',
        data: {
          name: product.name,
          price: product.price,
          id: product.id,
          description: product.description,
        },
      })
    } else {
      return res.render('/product-edit', {
        style: 'product-edit',
        info: 'Продукту за таким ID не знайдено',
      })
    }

  })
  
// ================================================================
  
router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  const product = Product.updateById(Number(id), {
    name,
    price,
    description,
  })
  console.log(id)
  console.log(product)

  if (product) {
    
    res.render('product-edit', {
      style: 'product-edit',
      info: 'Інформація про товар оновлена',
    })
  } else {
    res.render('product-edit', {
      style: 'product-edit',
      info: 'Сталася помилка',
    })
  }

  })

// ================================================================

router.get('/product-delete', function (req, res) {
  
  const { id } = req.query
  Product.deleteById(Number(id))
  res.render('product-alert', {
    style: 'product-alert',
    info: 'Товар видалений',
  })
})

// ================================================================



// ================================================================


// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
