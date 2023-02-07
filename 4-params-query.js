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

  if (!singleProduct) {
    return res.status(404).send("Product not found");
  }

  //console.log(singleProduct);
  return res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

// app.get("/api/v1/query", (req, res) => {
//   console.log(req.query);
//   res.send("hello world");
// });
// ^^^ ex: localhost:3000/api/v1/query?search=a&limit=3
// --> console.log(req.query) : { search: 'a', limit: '3' }
// after the '?', add as many search parameters as needed (seperate w/ '&')
// ex: localhost:3000/api/
// --> { name: 'adam', birthyear: '1992' }

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});
// ^^^ notice the placement of the 'return'(s)
// there can only be one response to a single request, which is why we are returning a mutated array, based on our if statements
// the 'return' statement is returning us back to the callback function with the new data from our if statements
// there is no 'return' after the second 'if' because the third 'if' is a stand-alone scenario, also the second 'if' is our final mutation to the data before the res.
app.listen(3000, () => {
  console.log("Server listening on port: 3000....");
});
