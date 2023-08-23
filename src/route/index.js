// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []; 

  constructor(name, price, description,) {   
	this.id = Math.floor(Math.random() * 100000);
	this.createDate = new Date().toISOString()
	  
    this.name = name;
    this.price = price;
    this.description = description;
  }
  
  static getList = () => this.#list;

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
	
  res.render('index', {
    style: 'index',

		
  })
})


// router.get('/', function (req, res) {
//   res.render('index', {
//     style: 'index',
//   })
// })

// ================================================================


router.post('/product-create', function (req, res) {
	
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)
  console.log(Product.getList())
  res.render('product-create', {
    style: 'product-create',
		// d
		info: 'Товар успішно додано',
  })
})





// ================================================================

router.get('/product-create', function (req, res) {
	const list = Product.getList()
  res.render('product-create', {
    style: 'product-create',
  })
})
// 

// ================================================================

router.get('/product-list', function (req, res) {
  const list = Product.getList()
  console.log(list)
  res.render('product-list', {
    style: 'product-list',
    data:{
      products:{
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
      return res.render('/product-alert', {
        style: 'product-alert',
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
    res.render('product-alert', {
      style: 'product-alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    res.render('product-alert', {
      style: 'product-alert',
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
