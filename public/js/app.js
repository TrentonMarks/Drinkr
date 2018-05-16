const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
    this.createForm = {};
    this.drinks = [];
    this.indexOfShow = null;
    this.indexOfEditFormToShow = null;
    this.reveal = false;
    this.searchBy = '';

    // Allows user to add a drink create/save a drink
    this.createDrink = () => {
        console.log('creating drink');
        $http({
            method: 'POST',
            url: '/drinks',
            data: {
                name: this.name,
                glass: this.glass,
                ingredients: this.ingredients,
                instructions: this.instructions,
                image: this.image,
            }
        }).then((response) => {
            this.createForm = {};
            this.drinks.push(response.data);
        }, error => {
            console.error(error);
        }).catch(error => console.error('Catch: ', error));
    };

    // Finds all drinks in users db
    this.getDrinks = () => {
        console.log('getting drinks');
        $http({
            method: 'GET',
            url: '/drinks'
        }).then((response) => {
            console.table(response.data);
            this.drinks = response.data;
    }, error => {
        console.error(error);
    }).catch(error => console.error('Catch: ', error));
      };

    // Allows user to 'like' a drink
    this.updateLikes = (drinks) => {
        drinks.likes = drinks.likes + 1;
        $http({
            method: 'PUT',
            url: '/drinks/' + drinks._id,
            data: {likes: drinks.likes}
        }).then((response) => {
            console.log(response.data.likes);
        }, error => {
            console.error(error);
        }).catch(error => console.error('Catch: ', error));
    };


    // Allows user to edit/update a drink in their saved drinks
    this.updateDrink = (drinks)=>{
        $http({
            method: 'PUT',
            url: '/drinks/' + drinks._id,
            data: {
                name: this.updatedName,
                glass: this.updatedglass,
                ingredients: this.updatedIngredients,
                instructions: this.updatedInstructions,
                image: this.updatedImage
            }
        }).then((response)=>{
            this.indexOfEditFormToShow = null;
            this.getDrinks();
        });
    };

    // Allows user to delete a drink from their saved drinks
    this.deleteDrinks = (id) => {
        $http({
            method: 'DELETE',
            url: '/drinks/' + id
        }).then((response) => {
            console.log(response.data);
            const removeByIndex = this.drinks.findIndex(drinks =>
                drinks._id === id);
                this.drinks.splice(removeByIndex, 1);
            }, error => {
                console.error(error);
            }).catch(error => console.error('Catch: ', error));
    };

    // Retrieves a random drink from the CocktailDB API
    this.getRandomDrink = ()=>{
        $http({
          method:'GET',
          url:'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        }).then( response =>{
          this.drink = response.data.drinks[0];
          console.log(response.data.drinks[0]);
          this.reveal = true;
        });
    };

    // Calls method immediately on page load
    this.getDrinks();
}]);


// KEEP
// // Retrieves data from the CocktailDB API based on the search input by the user
// this.searchDrink = ()=>{
//     $http({
//         method:'GET',
//         url:'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + this.searchBy
//     }).then( response =>{
//         this.drink = response.data.drinks[0];
//         console.log(response.data.drinks);
//     });
// };
                // HTML for Search Drink
                // <!-- Container that holds data to display for SEARCHED drinks -->
                // <div class="search-container">
                //     <h1> Looking for a Specific Drink? </h1>
                //     <h2> Try to search it! Just add the name of the drink you wish to see! </h2>
                //     <div class="search">
                //         <form ng-submit="ctrl.searchDrink()">
                //             <input class="u-half-width"
                //             type="text"
                //             placeholder="Add Drink Name..."
                //             ng-model="ctrl.searchBy"
                //             required>
                //             <button class='search-btn'>Search Drink</button>
                //         </form>
                //     </div>
                // </div>






    // KEEP
    // Code used for creating user and logging in
    // $http({
    //     method: 'POST',
    //     url: '/users',
    //     data: {
    //         username: 'bobby',
    //         password: 'bob'
    //     }
    // });
    //
    // $http({
    //     method: 'POST',
    //     url: '/sessions',
    //     data: {
    //         username: 'bobby',
    //         password: 'bob'
    //     }
    // });
    // HTML forms for creating user and logging in
    // <!-- Create User Form -->
    // <form action="/users" method="POST">
    //     <input type="text" name="username" placeholder="username"/>
    //     <input type="password" name="password" />
    //     <input type="submit" value="Create User" />
    // </form>
    //
    // <!-- Login Form -->
    // <form action="/sessions" method="POST">
    //     <input type="text" name="username" placeholder="username"/>
    //     <input type="password" name="password" />
    //     <input type="submit" value="Log In" />
    // </form>
    //
    // <!-- Logout Button -->
    // <form action="/sessions?_method=DELETE" method="POST">
    //     <input type="submit" value="Logout">
    // </form>
