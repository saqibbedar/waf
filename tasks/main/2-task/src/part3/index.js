import http from "http";
// import { read_file, write_file, append_file } from "../utils/index.js";


// Task description
/**
Create a web server using the Node JS http module. Create four to five routes /, /users, /products, /display, and /books. 

Maintain a log by appending a file “log.txt” using fs module every time a URL is visited. This file should store information such as serial number, time, 
date,  URL,  and number of  query  parameters  for  every  URL.  

Create  three  plain  text  files named “products.txt”, “users.txt”, and “books.txt” using fs module. Get the information for a specific  file  from  the  query  parameters  and  append  it.  

The  file  “products.txt”  should  get information from query parameters of route /products and it should contain id, product title, and product price. 

Similarly the files “users.txt” and “books.txt” should be appended from the query  parameters  of  /users  and  /books  routes,  respectively.  

The  file  “users.txt”  should contain id, user name, age, city, and university. The file “books.txt” should contain id, book title,  edition,  year  of  publication,  and  press  name.  

Hit  at  least  5  URLs  having  query parameters such as the following for each of the above-mentioned routes for testing: 
/ 

/users?id=24&name=Abdullah&age=60&city=Islamabad&uni=QAU 
 
/products?id=89&title=Samsung&price=75K 
 
/books?id=19&title=AlgorithmDesignAndApplications&edition=3&2019&press=Wiley 
*/

const PORT = 5000;

const server = http.createServer((req, res)=>{
    switch(req.url){
        case "/":
            res.end(`
                <h1>Welcome to Homepage</h1>
                <h3>Task 2: Part 3</h3>
                <p>Available Endpoints:</p>
                <ul>
                <li><a href="http://localhost:${PORT}"></a></li>
                <li><a href="http://localhost:${PORT}"></a></li>
                <li><a href="http://localhost:${PORT}"></a></li>
                <li><a href="http://localhost:${PORT}"></a></li>
                </ul>
                `);
          break;
        case "/users":
            res.end("Users page")
            break;
        case "/products":
            res.end("Products page")
            break;
        case "/display":
            res.end("Display page")
            break;
        case "/books":
            res.end("Books page")
            break;
        default:
            res.end(`
                <h1>Page Not Found</h1>
                <p>Go back to <a href="/">Homepage</a></p>`);
            break;
    }
});

server.listen(PORT, "localhost", () => console.log(`Part3 server is running at http://localhost:${PORT}/.`));