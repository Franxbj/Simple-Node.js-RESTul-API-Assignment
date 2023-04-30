const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// middleware function to handle post and Postman data

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// my hard coded sample data
let books = [
    {
        id: 1,
        title: 'Parenting by the Book',
        author: 'John Rosemond',
        genre: 'Parenting & Families',
        yearOfPublication: 2007,
        rating: 5,
        date: Date()
    },
    {
        id: 2,
        title: 'What next for AI',
        author: 'John Doe',
        genre: 'Technology',
        yearOfPublication: 2022,
        rating: 2,
        date: Date()
    },
    {
        id: 3,
        title: 'Eats, Shoots & Leaves',
        author: 'Lynne Truss',
        genre: 'How-to',
        yearOfPublication: 1997,
        rating: 3,
        date: Date()
    },
    {
        id: 4,
        title: 'Imagine',
        author: 'Helen Ju',
        genre: 'Travel',
        yearOfPublication: 2010,
        rating: 5,
        date: Date()
    }
];

// Get all books
app.get('/api/books', (req,res) => {
    res.json(books);
});

// Get one book
app.get('/api/books/:id', (req,res) => {
    const id = Number(req.params.id);
    const book = books.find(book => book.id === id);

    if (book)
    {
        res.json(book);
    }
    else
    {
        res.status(404).json(
            {
                msg: 'Book not found'
            }
        )
    }
});



// delete a book
app.delete('/api/books/:id', (req,res) =>{
    const id = Number(req.params.id);

    books = books.filter(book => book.id !== id)

    //res.json(books);

    res.status(200).json(
        {
            msg: 'Book ' + id + ' is deleted'
        }
    )
});

// create a book
app.post('/api/books', (req,res) => {
    
    //res.send("ok");    

    const newId = books[books.length-1].id +1;
    const newBook = {
        id: newId,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearOfPublication: req.body.yearOfPublication,
        rating: req.body.rating
    }

    books.push(newBook);
   
    res.status(201).json(newBook);

});

// update a book

app.patch('/api/books/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    const newTitle = req.body.title;
    const newAuthor = req.body.author;
    const newGenre = req.body.genre;
    const newYearOfPublication = req.body.yearOfPublication;
    const newRating = req.body.rating;

    //console.log(newTitle);
    const book = books.find(book => book.id === idToUpdate)
    if(book)
    {
        book.title = newTitle;
        book.author = newAuthor;
        book.genre = newGenre;
        book.yearOfPublication = newYearOfPublication;
        book.rating = newRating;

        res.status(200).json(book)
    }
    else{
        res.status(400).json({
            "msg" : "Book not added"
        })
    }
});



app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req,res) => {
    //res.send("Welcome to the testing field");
    res.render('index', 
    {
        pagetitle : "Simple Node.js RESTul API"
    }); 
})

app.get('/about-us', (req,res) => {
    res.render('about-us',
    {
        pagetitle: 'All about us!'
    });
})


app.get('/collections', (req,res) => {

   res.render('collections',
   {
    pagetitle: 'Welcome to our Book Collections',
    books : books
   });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
