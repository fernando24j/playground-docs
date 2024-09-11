// import * as fs from 'fs';
// import { TemplateHandler } from 'easy-template-x';
const fs = require("fs");
const { TemplateHandler } = require("easy-template-x");

const fun = async () => {
  //? 0. Borrar el documento creado
  try {
    await fs.unlinkSync("./myTemplate-output.docx");
  } catch (error) {}
  //? 1. read template file
  const templateFile = fs.readFileSync("myTemplate.docx");

  //? 2. process the template
  const url = 'https://labcontrol.co/assets/sastek_files/LabControl_H-01.png';
  const responseImg = await fetch(url);
  const arrayBuffer = await responseImg.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const data = {
    "Dont worry be happy": {
      _type: "rawXml",
      xml: '<w:sym w:font="Wingdings" w:char="F04A"/>',
      replaceParagraph: false, // Optional - should the plugin replace an entire paragraph or just the tag itself
    },
    posts: [
      { author: "Alon Bar", text: "Very important\ntext here!" },
      { author: "Alon Bar", text: "Forgot to mention that..." },
    ],
    "Kung Fu Hero": {
      _type: "image",
      source: buffer,
      // source: fs.readFileSync("hero.png"),
      format: 'image/png',
      width: 400,
      height: 150,
      altText: "Kung Fu Hero", // Optional
      transparencyPercent: 80, // Optional
    },
  };

  const handler = new TemplateHandler();

  const doc = await handler.process(templateFile, data);
  // 3. save output
  fs.writeFileSync("myTemplate-output.docx", doc);
};

fun();
