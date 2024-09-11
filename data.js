require('isomorphic-fetch');

const run = async () => {
  const request = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: '{"query":"{ allFilms { films { title, releaseDate } } }"}',
  })

  const data =  await request.json()
  console.log(JSON.stringify(data))
}


run()