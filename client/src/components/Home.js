import React from 'react';
import faker from 'faker';
import { Link } from 'react-router-dom';

function Home() {
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

  return (
    <div className="container">
      <div className="row pt-4">
        <div className="col-12 col-lg-6 offset-lg-3">
          {getAllArticles.map(article => {
            return (
              <div key={article.id} className="card mb-3">
                <Link
                  to={`/articles/${article.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card-body">
                    <h4 className="card-title">{article.title}</h4>
                    <p className="card-text">
                      <small className="text-muted">
                        <b>{article.author}</b> - {article.createdOn}
                      </small>
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
