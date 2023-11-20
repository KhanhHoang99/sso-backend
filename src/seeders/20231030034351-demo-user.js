'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User', 
    [
      {
        email: 'nguyenlehoangkhanh167@gmail.com',
        password: "123",
        username: "khanh"
      },
      {
        email: 'nguyenlehoangkhanh1679@gmail.com',
        password: "123",
        username: "khanh2"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
