// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
	static #list = []

	static #count = 0

	constructor(
		img, 
		title, 
		description, 
		category, 
		price, 
		amount = 0,
		) {
		this.id = ++Product.#count // генерує унікальний id
		this.img = img
		this.title = title
		this.description = description
		this.category = category
		this.price = price
		this.amount = amount
	}

	static add = (...data) => {
		const newProduct = new Product(...data)

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
	'1Комп`ютер ARTLINE Gaming',
	'AMD rysen 5 3600(3.6 - 4.2 ГГц)',
	[
		{id:1, text:'Готовий йдо відправки'},
		{id:2, text:'Топ продаж'},
	],
	27000,
	9,
)


Product.add(
	'https://picsum.photos/200/300',
	'2Комп`ютер ARTLINE ',
	'AMD rysen 5 3600(2.6 - 4.2 ГГц)',
	[
		{id:2, text:'Топ продаж'},
	],
	20000,
	8,
)



Product.add(
	'https://picsum.photos/200/300',
	'3Комп`ютер  Gaming',
	'AMD rysen 5 3600(3.6 - 4.0 ГГц)',
	[
		{id:1, text:'Готовий йдо відправки'},
	],
	37000,
	7,
)

class Purchase {
	static DELIVERY_PRICE = 150
	static#BONUS_FACTOR = 0.1

	static #count = 0
	static #list = []

	static #bonusAccount = new Map()

	static getBonusBalanse = (email) => {
		return Purchase.#bonusAccount.get(email) || 0
	}

	static calcBonusAmount = (value) => {
		return value * Purchase.#BONUS_FACTOR
	}

	static updateBonusBalance = (
		email,
		price,
		bonusUse = 0,
	) => {
		const amount = this.calcBonusAmount(price)

		const currentBalance = Purchase.getBonusBalanse(email)

		const updateBalance = currentBalance + amount - bonusUse

		Purchase.#bonusAccount.set(email, updateBalance)

		console.log(email, updateBalance)

		return amount
	}

	constructor(data, product) {
		this.id = ++Purchase.#count

		this.firstname = data.firstname
		this.lastname = data.lastname

		this.phone = data.phone
		this.email = data.email

		this.comment = data.comment || null
		this.bonus = data.bonus | 0
		this.promocode = data.promocode || null

		this.totalPrice = data.totalPrice
		this.productPrice = data.productPrice
		this.deliveryPrice = data.deliveryPrice
		this.amount = data.amount

		this.product = product
	}

	static add = (...arg) => {
		const newPurchase = new Purchase(...arg)

		this.#list.push(newPurchase)

		return newPurchase
	}

	static getList = () => {
		return Purchase.#list.reverse().map((id, name, totalPrice, bonus ) => {
			id, 
			name, 
			totalPrice, 
			bonus 
		}) // Через дуструктуризацію витягуємо необхідні дані  і повертаємо в об'єкт
	}

	static getById = (id) => {
		return Purchase.#list.find((item) => item.id === id)
	}

	static updateById = (id, data) => {
		const purchase = Purchase.getById(id)

		if(Purchase) {
			if(data.firstname) purchase.firstname = data.firstname
			if(data.lastname) purchase.lastname = data.lastname
			if(data.phone) purchase.phone = data.phone
			if(data.email) purchase.email = data.email

			return true
		} else {
			return false
		}

	}
}

class Promocode {
	static #list = []

	constructor(name, factor) {
		this.name = name
		this.factor = factor
	}

	static add = (name, factor) => {
		const newPromoCode = new Promocode(name, factor)
		Promocode.#list.push(newPromoCode)
		return newPromoCode
	}

	static getByName = (name) => {
		return this.#list.find((promo) => promo.name === name)
		
	}

	static calc = (promo, price) => {
		return price * promo.factor
	}
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// ================================================================

// router.get('/', function (req, res) {

//   res.render('', {
   
//     style: '',	

		
//   })
// })

// ================================================================

router.get('/', function (req, res) {

  res.render('purchase-index', {
   
    style: 'purchase-index',	

		data: {
			list: Product.getList(),
		},
  })
})

// ================================================================

router.get('/purchase-product', function (req, res) {
	const id = Number(req.query.id)

  res.render('purchase-product', {
   
    style: 'purchase-product',	

		data: {
			list: Product.getRandomList(id),
			product: Product.getById(id),
		},
  })
})

// ================================================================

router.post('/purchase-create', function (req, res) {
	const id = Number(req.query.id)
	const amount = Number(req.body.amount)

	if(amount < 1) {
		return	res.render('alert', {   
			style: 'alert',		
			data: {
				message: 'Помилка',
				info: 'Некорректна кількість товару',
				link:`/purchase-product?id=${id}`,
			},
		})
	}

	const product = Product.getById(id)

	if(product.amount < 1) {
		return	res.render('alert', {   
			style: 'alert',		
			data: {
				message: 'Помилка',
				info: 'Такої кількості товару немає в наявності',
				link:`/purchase-product?id=${id}`,
			},
		})
	}

	console.log(product, amount)

	const productPrice = product.price * amount
	const totalPrice = productPrice + Purchase.DELIVERY_PRICE
	const bonus = Purchase.calcBonusAmount(totalPrice)

	res.render('purchase-create', {
		
		style: 'purchase-create',	

		data: {
			id: product.id,
			cart: [
				{
					text: `${product.title} (${amount} шт)`,
					price: productPrice,				
				},
				{
					text: `Доставка`,
					price: Purchase.DELIVERY_PRICE,				
				},
			],
			totalPrice,
			productPrice,
			deliveryPrice: Purchase.DELIVERY_PRICE,
			amount,
			bonus,
		},
	})
	
})

// ================================================================

router.post('/purchase-submit', function (req, res) {
	const id = Number(req.query.id)

	let {
		totalPrice,
		productPrice,
		deliveryPrice,
		amount,

		firstname,
		lastname,
		email,
		phone,
		comment,

		promocode,
		bonus,
	} = req.body

	const product = Product.getById(id)

	if(!product) {
		return	res.render('alert', {   
			style: 'alert',		
			data: {
				message: 'Помилка',
				info: 'Товар не знайдено',
				link:`/purchase-list`,
			},
		})
	}

	if(product.amount < amount) {
		return	res.render('alert', {   
			style: 'alert',		
			data: {
				message: 'Помилка',
				info: 'Товару немає в потрібній кількості',
				link:`/purchase-list`,
			},
		})
	}

	totalPrice = Number(totalPrice)
	productPrice = Number(productPrice)
	deliveryPrice = Number(deliveryPrice)
	amount = Number(amount)
	bonus = Number(bonus)


	if(
		isNaN(totalPrice) ||
		isNaN(productPrice) || 
		isNaN(deliveryPrice)
		// || 	isNaN(amount)

		|| isNaN(bonus)

	) {
		
		return res.render('alert', {   
			style: 'alert',	

			data: {
				message: 'Помилка',
				info: 'Некоректні дані',
				link:`/purchase-list`,
			},
		})
	}

	if(!firstname || !lastname || !email || !phone) {
	return	res.render('alert', {   
		style: 'alert',		
		data: {
			message: 'Заповніть обов`язкові поля',
			info: 'Некоректні данні',
			link:`/purchase-list`,
		},
	})
	}

	if(bonus || bonus > 0) {
		const bonusAmount = Purchase.getBonusBalanse(email)

		console.log(bonusAmount)

		if(bonus > bonusAmount) {
			bonus = bonusAmount
		}

		Purchase.updateBonusBalance(email, totalPrice, bonus)

		totalPrice -= bonus
	} else {
		Purchase.updateBonusBalance(email, totalPrice, 0)
	}

	if(promocode) {
		promocode = Promocode.getByName(promocode)
		if(promocode) {
			totalPrice = Promocode.calc(promocode, totalPrice)
		}
	}

	if(totalPrice < 0) totalPrice = 0

	const purchase = Purchase.add(
		{
			totalPrice,
			productPrice,
			deliveryPrice,
			amount,
			bonus,

			firstname,
			lastname,
			email,
			phone,

			promocode,
			comment,
		},
		product,
	)

	console.log(purchase)

  res.render('alert', {
   
    style: 'alert',	

		data: {
			message: 'Успішно',
			info: 'Замовлення створено',
			link:`/purchase-list`,
		},
  })
})

// ================================================================

router.get('/my-purchase', function (req, res) {

  res.render('my-purchase', {
   
    style: 'my-purchase',	

		data: {
			ID: Purchase.getList.getById,
			name: Purchase.getList.title,
			totalPrice: Purchase.getList.totalPrice,
			bonus: Purchase.getList.bonus, 
		}	 

		
  })
})

// ================================================================

router.get('/purchase-info', function (req, res) {

  res.render('purchase-info', {
	
   
    style: 'purchase-info',	

		data: {
			purchaseId: Purchase.id,
      firstname: Purchase.firstname,
      lastname: Purchase.lastname,
      phone: Purchase.phone,
      email: Purchase.email,
			
			deliveryAddress: "вул. Центральна 14, кв. 36, м. Київ, 02000, Україна",

			productName: Product.title,
      productPrice: Purchase.productPrice,
      deliveryPrice: Purchase.deliveryPrice,
      totalPrice: Purchase.totalPrice,
      bonusEarned: Purchase.bonus,
		}
		
  })
})


// ================================================================

router.get('/purchase-edit', function (req, res) {

  res.render('purchase-edit', {
   
    style: 'purchase-edit',	

		
  })
})


// Підключаємо роутер до бек-енду
module.exports = router
