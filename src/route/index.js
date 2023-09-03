// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Track {
	static #list = [] // Статичне приватне поле для зберігання об'єктів класу Track

	constructor(name, author, image) {
		this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадковий ID
		this.name = name
		this.author = author
		this.image = image
	}

	// Статичний метод для створення об'єкту Track і додавання його до об'єкту #list 
	static create(name, author, image) {
		const newTrack = new Track(name, author, image)
		this.#list.push(newTrack)
		return newTrack
	}

	// Статичний метод для отримання всього списку треків
	static getList() {
		return this.#list.reverse()
	}

	static getById(id){
		return (
			this.#list.find(
				track => track.id === id
				) || null
		)
	}
}

Track.create(
	'q', 
	'q', 
	'https://picsum.photos/100/100',
)

Track.create(
	'w', 
	'w', 
	'https://picsum.photos/100/100',
)

Track.create(
	'e', 
	'e', 
	'https://picsum.photos/100/100',
)

Track.create(
	'r', 
	'r', 
	'https://picsum.photos/100/100',
)

Track.create(
	't', 
	't', 
	'https://picsum.photos/100/100',
)

Track.create(
	'y', 
	'y', 
	'https://picsum.photos/100/100',
)

Track.create(
	'u', 
	'u', 
	'https://picsum.photos/100/100',
)

// console.log(Track.getList())

class Playlist {
	static #list = [] // Статаичне поле для зберігання списку об'єктів Playlist

	constructor(name) {
		this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадкове ID
		this.name = name
		this.track = []
		this.image = 'https://picsum.photos/100/100'
	}

	// Статичний метод для створення об'єкту Playlist  і додавання його до списку #list
	static create(name) {
		const newPlaylist = new Playlist(name)
		this.#list.push(newPlaylist)
		return newPlaylist
	}

	// Статичний метод для отримання всього списку плейлистів
	static getList() {
		return this.#list.reverse()
	}

	static makeMix(playlist) {
		const allTracks = Track.getList()

		let randomTracks = allTracks
			.sort(() => 0.5 - Math.random())
			.slice(0, 3)

		playlist.track.push(...randomTracks)
	}

	static getById(id) {
		return (
			Playlist.#list.find(
				(playlist) => playlist.id === id
			) || null
		)
			
		
	}

	deleteTrackById(trackId) {
		this.track = this.track.filter(
			(track) => track.id !== trackId,
		)
	}

	static findListByValue(name) {
		return this.#list.filter((playlist) => 
			playlist.name
				.toLowerCase()
				.includes(name.toLowerCase()),
		)
	}

	addTrack(trackId) {
    const track = Track.getById(trackId)

		this.track.push(track)
    
	}


}

Playlist.makeMix(Playlist.create('Test1'))
Playlist.makeMix(Playlist.create('Test2'))
Playlist.makeMix(Playlist.create('Test3'))


// ================================================================

router.get('/', function (req, res) {
	const id = Playlist.getById()

	// console.log(list)

	// const [name, image, track, ...qwe] = list
	console.log('================111=======================')
	const list = Playlist.getList(id)

	const {name, image} = list

	console.log(name, image)
	console.log('================222=======================')
	

	const [Test1, Test2, Test3, ...Testn] = a
	// console.log(Test2)

	// const{id1, name, track, image} = Test1

	const b = track.filter((obj) => obj.id = true)

	console.log(b)

	console.log('================333=======================')
	
	console.log(track.length)
	
	console.log('================444=======================')
  res.render('spotify-playlist-all', {
   
    style: 'spotify-playlist-all',	

		data: {
			image: list.image,
			name: list.name,
			// length: list.track.length,
		},
		
  })
})


// ================================================================

router.get('/spotify-choose', function (req, res) {

  res.render('spotify-choose', {
   
    style: 'spotify-choose',	

		data: {},
		
  })
})

// ================================================================

router.get('/spotify-create', function (req, res) {
	const isMix = !!req.query.isMix
	// console.log(isMix)

  res.render('spotify-create', {   
    style: 'spotify-create',
		
		data: {
			isMix,
		},
		
  })
})

// ================================================================

router.post('/spotify-create', function (req, res) {
	const isMix = !!req.query.isMix

	const name = req.body.name

	if(!name) {
		return res.render('alert', {   
			style: 'alert',	
	
			data: {
				message: 'Помилка',
				info: 'Введіть назву плейлиста',
				link: isMix 
				? '/spotify-create?isMix=true' 
				: '/spotify-create',
			},
			
		})
	}

	const playlist = Playlist.create(name)

	if(isMix) {
		Playlist.makeMix(playlist)
	}

	console.log(playlist)

	res.render('spotify-playlist', {   
    style: 'spotify-playlist',
		
		data: {
			playlistId: playlist.id,
			tracks: playlist.track,
			name: playlist.name,
		},
		
  })

})

// ================================================================

router.get('/spotify-playlist', function (req, res) {
	const id = Number(req.query.id)

	const playlist = Playlist.getById(id)

	if(!playlist) {
		return res.render('alert', {   
			style: 'alert',	
	
			data: {
				message: 'Помилка',
					info: 'Такого плейлиста не знайдено',
					link: `/`,
			},
			
		})
	}

  res.render('spotify-playlist', {   
    style: 'spotify-playlist',
		
		data: {
			playlistId: playlist.id,
			tracks: playlist.track,
			name: playlist.name,
		},		
  })
})

// ================================================================

router.get('/spotify-playlist-add', function (req, res) {
	
  const playlist = req.query.playlistId

  res.render('spotify-playlist-add', {   
    style: 'spotify-playlist-add',
		
		data: {
			playlistId: playlist.id,
			tracks: Track.getList(),
			name: playlist.name,
		},		
  })
})

// ================================================================

router.post('/spotify-playlist-add', function (req, res) {
  const trackId = Number(req.body.trackId)
	const playlist = Number(req.query.playlistId)

	playlist.addTrack(trackId())	
})

// ================================================================



router.get('/spotify-track-delete', function (req, res) {
	const playlistId = Number(req.query.playlistId)
	const trackId = Number(req.query.trackId)

	const playlist = Playlist.getById(playlistId)

	if(!playlist) {
		return res.render('alert', {   
			style: 'alert',	
	
			data: {
				message: 'Помилка',
					info: 'Такого плейлиста не знайдено',
					link: `/spotify-playlist?id=${playlistId}`,
			},
			
		})
	}

	playlist.deleteTrackById(trackId)

  res.render('spotify-playlist', {   
    style: 'spotify-playlist',
		
		data: {
			playlistId: playlist.id,
			tracks: playlist.track,
			name: playlist.name,
		},
		
  })
})

// ================================================================


router.get('/spotify-search', function (req, res) {
const value = ''

const list = Playlist.findListByValue(value)



  res.render('spotify-search', {   
    style: 'spotify-search',
		
		data: {
			list: list.map(({track, ...rest}) => ({
				...rest,
				amount: track.length
			})),
			value,
		},		
  })
})

// ================================================================

router.post('/spotify-search', function (req, res) {
	const value = req.body.value || ''
	
	const list = Playlist.findListByValue(value)
	
	console.log(value)

	res.render('spotify-search', {   
		style: 'spotify-search',
		
		data: {
			list: list.map(({track, ...rest}) => ({
				...rest,
				amount: track.length
			})),
			value,
		},		
	})
})
	
// ================================================================
	
	

// Підключаємо роутер до бек-енду
module.exports = router
