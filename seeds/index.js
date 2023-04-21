const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Recipes',
  },
  {
    category_name: 'Tips',
  },
  {
    category_name: 'Questions',
  },
  
];

const seedCategories = () => Category.bulkCreate(categoryData);

seedCategories();