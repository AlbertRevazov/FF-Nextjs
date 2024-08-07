'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Favorites', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			favoriteApiId: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			crest: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			// Другие поля, если они есть
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Favorites')
	},
}
