'use strict';

const nanoid = require('nanoid')

module.exports = {
  beforeCreate: async (model) => {
    model.set('id', nanoid());
  }
};