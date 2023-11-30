'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [{
      title: 'Sample Task 1',
      description: 'This is a sample task description',
      userID: 11,
      priority: 3,
      dueDate: new Date(),
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Sample Task 2',
      description: 'Another sample task description',
      userID: 11,
      priority: 2,
      dueDate: new Date(),
      isCompleted: true,
      completedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
