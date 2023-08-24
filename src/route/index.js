// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
	static #list = []

	static #count = 0

	constructor(img, title, description, category, price) {
		this.id = ++Product.#count // генерує унікальний id
		this.img = img
		this.title = title
		this.description = description
		this.category = category
		this.price = price
	}

	static add = (img, title, description, category, price) => {
		const newProduct = new Product(img, title, description, category, price)

		this.#list.push(newProduct)
	}

	static getList = () => {
		return this.#list
	}

	static getById = (id) => {
		return this.#list.find((product) => product.id === id)
	}

	static getRandomList = (id) => {
		// фільтруємо товари, щоб вилучити той з яким порівнюємо id
		const filtredList = this.#list.filter(
			(product) => product.id !== id,
		)

		// Відсортовуємо за допомогою Math.random() та переміщаємо масив
		const shufledList = filtredList.sort(
			() => Math.random() - 0.5,
		) 

		// Повертаємо перші 3 елементи з перемішаного масиву
		return shufledList.slice(0, 3)

	}
}

Product.add(
	'https://picsum.photos/200/300',
	'Комп`ютер ARTLINE Gaming',
	'AMD rysen 5 3600(3.6 - 4.2 ГГц)',
	[
		{id:1, text:'Готовий йдо відправки'},
		{id:2, text:'Топ продаж'},
	],
	27000
)


Product.add(
	'https://picsum.photos/200/300',
	'Комп`ютер ARTLINE ',
	'AMD rysen 5 3600(2.6 - 4.2 ГГц)',
	[
		{id:2, text:'Топ продаж'},
	],
	20000
)



Product.add(
	'https://picsum.photos/200/300',
	'Комп`ютер  Gaming',
	'AMD rysen 5 3600(3.6 - 4.0 ГГц)',
	[
		{id:1, text:'Готовий йдо відправки'},
	],
	37000
)


// ================================================================

router.get('/', function (req, res) {

  res.render('purchase-index', {
   
    style: 'purchase-index',	

		data: {list: Product.getList(),
		},
  })
})

// ================================================================

router.get('/purchase-product', function (req, res) {
	const id = Number(req.query.id)

  res.render('purchase-product', {
   
    style: 'purchase-product',	

		data: {list: Product.getRandomList(id),
			product: Product.getById(id),
		},
  })
})

// ================================================================


router.post('/purchase-create', function (req, res) {
	const id = Number(req.query.id)
	const amount = Number(req.body.amount)

	console.log(id, amount)

  res.render('purchase-product', {
   
    style: 'purchase-product',	

		data: {
			list: Product.getRandomList(id),
			product: Product.getById(id),
		},
  })
})

// ================================================================


router.get('/test-path', function (req, res) {

  res.render('alert', {
   
    style: 'alert',	

		data: {
			message:' Операція успішна',
			info: 'Товар створений',
			link: '/test-path',			
		},
  })
})

// ================================================================

// router.get('/', function (req, res) {

//   res.render('purchase-index', {
   
//     style: 'purchase-index',	

// 		data: {
// 			img:'https://picsum.photos/200/300',
// 			title: 'Компьютер ARTLINE Gaming',
// 			description: 'AMD rysen 5 3600(3.6 - 4.2 ГГц)',			
// 			category : [
// 				{id:1, text:'Готовий йдо відправки'},
// 				{id:2, text:'Топ продаж'},
// 			],
// 			price: 2700,
// 		},
//   })
// })





// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
