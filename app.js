const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // keep in mind, ':productID' (also, can be named whatever) will return a string.
  // will need to convert to a number since our product id's are numbers.
  //console.log(req.params);
  // 'params' is whatever you type behind the ':'

  const { productID } = req.params;
  //console.log({ productID });
  // ^^^ variable wrapped in {} becasue req is an object
  // ^^^ 'req.params' = { productID: string}

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
    // ^^^ convert product_id to a number
  );

  //console.log(singleProduct);
  return res.json(singleProduct);
});

app.listen(3000, () => {
  console.log("Server listening on port: 3000....");
});
