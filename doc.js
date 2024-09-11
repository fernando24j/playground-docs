import { createReport } from "docx-templates";
import fs from "fs";

const run = async () => {
  const template = fs.readFileSync("images-many-tiles.docx");

  const buffer = await createReport({
    template,
    data: {
      name: "John",
      surname: "Appleseed",
    },
  });

  fs.writeFileSync("report1.docx", buffer);
};

run();
