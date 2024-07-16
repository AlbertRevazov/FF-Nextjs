require('dotenv').config()
const { Router } = require('express')
const router = new Router()

const { X_API_URL } = process.env
const { fetchData } = require('../../utils/Fetching')
const sortedSquad = require('../../utils/sortedSquad')

router.get('/:id', async (req, res) => {
	try {
		const data = await fetchData(`${X_API_URL}/teams/${req.params.id}`)

		const groupedPlayers = sortedSquad(data.squad)
		return res.send({ ...data, team: data.team, squad: groupedPlayers })
	} catch (error) {
		console.error(error)
		return res.status(500).send(error.message)
	}
})

router.get('/calendar/:id', async (req, res) => {
	try {
		const data = await fetchData(`${X_API_URL}/teams/${req.params.id}/matches`)
		return res.send(data)
	} catch (error) {
		console.error(error)
		return res.status(500).send(error.message)
	}
})

module.exports = router
