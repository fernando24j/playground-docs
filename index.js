require("isomorphic-fetch");
const qrcode = require("yaqrcode");
const createReport = require("docx-templates").default;
const fs = require("fs");

const template = fs.readFileSync(process.argv[2]);

createReport({
  template,
  data: {
    allFilms: {
      films:[]
      // films: [
      //   {
      //     title: "A New Hope",
      //     releaseDate: "1977-05-25",
      //   },
      //   {
      //     title: "The Empire Strikes Back",
      //     releaseDate: "1980-05-17",
      //   },
      //   {
      //     title: "Return of the Jedi",
      //     releaseDate: "1983-05-25",
      //   },
      //   {
      //     title: "The Phantom Menace",
      //     releaseDate: "1999-05-19",
      //   },
      //   {
      //     title: "Attack of the Clones",
      //     releaseDate: "2002-05-16",
      //   },
      //   {
      //     title: "Revenge of the Sith",
      //     releaseDate: "2005-05-19",
      //   },
      // ],
    },
  },
  additionalJsContext: {
    tile: async (z, x, y, size = 3) => {
      const resp = await fetch(
        `http://tile.stamen.com/toner/${z}/${x}/${y}.png`
      );
      const buffer = resp.arrayBuffer
        ? await resp.arrayBuffer()
        : await resp.buffer();
      return { width: size, height: size, data: buffer, extension: ".png" };
    },
    qr: (contents) => {
      const dataUrl = qrcode(contents, { size: 500 });
      const data = dataUrl.slice("data:image/gif;base64,".length);
      return {
        width: 6,
        height: 6,
        data,
        extension: ".gif",
        caption: "QR Code caption",
      };
    },
  },
})
  .then((rendered) =>
    fs.writeFileSync(process.argv.length > 3 ? process.argv[3] : null, rendered)
  )
  .catch(console.log);

// createReport({
//   template,
//   data: query =>
//     fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query }),
//     })
//       .then(res => {
//         // console.log(JSON.stringify({ query }))
//         return res.json()
//       })
//       .then(res => res.data),
//   additionalJsContext: {
//     tile: async (z, x, y, size = 3) => {
//       const resp = await fetch(
//         `http://tile.stamen.com/toner/${z}/${x}/${y}.png`
//       );
//       const buffer = resp.arrayBuffer
//         ? await resp.arrayBuffer()
//         : await resp.buffer();
//       return { width: size, height: size, data: buffer, extension: '.png' };
//     },
//     qr: contents => {
//       const dataUrl = qrcode(contents, { size: 500 });
//       const data = dataUrl.slice('data:image/gif;base64,'.length);
//       return { width: 6, height: 6, data, extension: '.gif', caption: 'QR Code caption' };
//     },
//   },
// }).then(
//   rendered => fs.writeFileSync(
//     process.argv.length > 3 ? process.argv[3] : null,
//     rendered
//   ))
//   .catch(console.log);
