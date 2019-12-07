//@ts-check

// Seed database initializer

const faker = require('faker');
let moment = require('moment');

let articlesId = 1;

const createArticles = () => {
  const randDate = [
    'Dec 04, 2019',
    'Dec 02, 2019',
    'Dec 05, 2019',
    'Dec 10, 2019'
  ];

  let articleJson = {
    id: articlesId++,
    title: faker.lorem.words(),
    body: faker.lorem.paragraph(),
    author: faker.name.findName(),
    createdOn: randDate[Math.floor(Math.random() * randDate.length)]
  };

  return articleJson;
};

const getAllArticles = new Array(3).fill(0).map(createArticles);

// instance is req.body
const isValidArticle = instance => {
  instance.title = instance.title;
  instance.body = instance.body;
  instance.author = instance.author;

  if (!instance.title || !instance.body || !instance.author) {
    throw new Error("Article's title, body and author must not be empty");
  } else if (
    typeof instance.title !== 'string' ||
    typeof instance.body !== 'string' ||
    typeof instance.author !== 'string'
  ) {
    throw new Error("Article's title, body and author must be strings");
  }

  return true;
};

const db = {
  getAllArticles: {
    data: getAllArticles,
    nextId: articlesId,
    isValid: isValidArticle
  }
};

const model = db.getAllArticles;

const existsInDb = id => {
  let index = model.data.findIndex(element => {
    return element.id == id;
  });
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
};

const getAllFromDatabase = () => {
  return model.data;
};

const getFromDatabaseById = id => {
  return model.data.find(element => {
    return element.id == id;
  });
};

const addToDatabase = instance => {
  if (model.isValid(instance)) {
    instance.id = model.nextId++;
    instance.createdOn = moment().format('MMM DD, YYYY');
    model.data.push(instance);
    return model.data[model.data.length - 1];
  }
};

const updateDatabase = instance => {
  const instanceIndex = model.data.findIndex(element => {
    return element.id == instance.id;
  });
  if (model.isValid(instance)) {
    model.data[instanceIndex] = instance;
    return model.data[instanceIndex];
  }
};

const deleteFromDatabase = id => {
  let index = model.data.findIndex(element => {
    return element.id == id;
  });
  model.data.splice(index, 1);
};

module.exports = {
  getAllFromDatabase,
  existsInDb,
  getFromDatabaseById,
  addToDatabase,
  updateDatabase,
  deleteFromDatabase
};
