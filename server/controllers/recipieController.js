require("../connection/db")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")
const Contact = require("../models/contact")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const register = require("../models/register")
// GET Homepage
exports.homepage = async(req,res)=>{

    try {  
        const categories = await Category.find({})
        const latest = await Recipe.find({}).sort({_id:-1}).limit(5)
        const burger = await Recipe.find({'category':'burger'}).sort({_id:-1}).limit(5)
        const food = {latest,burger}
        const token= req?.cookies?.jwt;
  
        res.render("index",{title:"homepage",categories,food,token})                 
    } catch (error) {
        res.status(500).send({message: error.message||"Something went wrong 😩"}) 
    }

} 



//GET recipe/:id
exports.exploreRecipe = async(req,res)=>{
    try {
        let recipeId = req.params.id;
        const recipe =  await Recipe.findById(recipeId)
        const token= req.cookies.jwt;
        res.render("recipe",{title:"recipe",recipe,token})                 
        
    } catch (error) {
        res.status(500).send({message: error.message||"Something went wrong 😩"})
        
    }
}

// GET Categories/:id
exports.exploreCategories = async(req,res)=>{
    try {
        let categoryId = req.params.id;
        const category =  await Recipe.find({'category':categoryId})
const token= req.cookies.jwt;

        console.log(category);
        res.render("category",{title:"category",category,token})                 
        
    } catch (error) {
        res.status(500).send({message: error.message||"Something went wrong 😩"})
        
    }
}

/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });

const token= req.cookies.jwt;
      
    //   res.json(recipe)
      res.render('search', { title: 'Search', recipe ,token} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
    
  }

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
    try {
    //   const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 });
const token= req.cookies.jwt;

      res.render('exploreLatest', { title: ' Explore Latest', recipe,token } );
    } catch (error) {
      res.status(500).send({message: error.message || "Something went wrong 😩" });
    }
  }  
  
  
   
  /**
   * GET /explore-random
   * Explore Random as JSON
  */
  exports.exploreRandom = async(req, res) => {
    try {
      let count = await Recipe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let recipe = await Recipe.findOne().skip(random).exec();
const token= req.cookies.jwt;

      res.render('exploreRandom', { title: 'Explore random', recipe ,token} );
    } catch (error) {
      res.status(500).send({message: error.message || "Something went wrong 😩" });
    }
  } 

  /**
 * GET /submitrecipe
 * Submit Recipe
*/
exports.submitRecipe = async(req ,res) => {
  try {
    const infoErrors = req.flash('infoErrors');
    const infoSubmit = req.flash('infoSubmit');
console.log("cookie is "+ req.cookies.jwt);
const token= req.cookies.jwt;
console.log(req.user.name);

const category = await Category.find({});
    res.render('submitRecipe', { title: ' Submit Recipe' ,infoErrors,infoSubmit, category, token} );
   
  } catch (error) {
    res.status(500).send({message: error.message || "Something went wrong 😩" });
    
  }
 
  }

   /**
 * post /submitrecipe
 * Submit Recipe
*/
exports.submitRecipeonPost = async(req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;
    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files?.image;
      newImageName =  imageUploadFile?.name;

      uploadPath =  './public/img/' + newImageName; 

      imageUploadFile?.mv(uploadPath, function(err){ 
        if(err) return res.satus(500).send(err); 
      })
    }
    
    // console.log(imageUploadFile + newImageName + uploadPath);



    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName

    });
     
    await newRecipe.save();


 
    req.flash('infoSubmit','Recipe added sucessfully 😄')

    res.redirect('/submitRecipe' );
  } catch (error) {
    req.flash('infoErrors',error) 
console.log(error);
    res.redirect('/submitRecipe' );
    
  }
 
}

// contact 

exports.contact = async (req,res)=>{
try {
  const mess=req.flash("mess")
const token= req.cookies.jwt;

  res.render('contact',{title:"contactUs",mess,token})

} catch (error) {
  res.status(500).send({message: error.message || "Something went wrong 😩" });

}
}

// contact on post 

 
exports.contactonPost = async(req,res)=>{
  try {
    
const data = new Contact({
  name:req.body.name,
  email:req.body.email,
  message:req.body.message
})

await data.save()
req.flash("mess","Message sent sucessfully 😄")
res.redirect("/contact");
  } catch (error) {
  
      res.status(500);
      req.flash(send("mess",{message: error.message || "Something went wrong 😩" }))
  }
}








exports.errorpage=(req,res)=>{
  try {
    res.status(404);
const token= req.cookies.jwt;

    res.render('error',{title:"error", token})
  
  } catch (error) {
    res.status(500).send({message: error.message || "Something went wrong 😩" });
  
  }
  } 
















// dummydata insert in db 
// const insertdummy = async ()=>{
//     try {
//         await Recipe.insertMany([
           
//     { 
//                 "name": "Kaju Katli | Kaju Barfi",
//                 "description": `Perfect Kaju Katli is a traditional Indian cashew fudge candy that’s terrifically smooth, thin, and melts in your mouth. This lovely treat includes a hint of rose but is completely customizable with your favorite flavors. And while it’s not the easiest recipe to make from scratch, I promise it’s worth every bit of effort! My step-by-step photos, video and instructions will help you make this foolproof kaju katli recipe as a dessert for yourself or a sweet gift for family and friends.`,
//                 "ingredients": [
//                   "1 cup cashews – 160 grams",
//                   "½ cup sugar – 100 grams sugar",
//                   "5 tablespoons water",
//                   "1 tablespoon Ghee or coconut oil or any neutral tasting oil (optional)",
//                   "1 teaspoon chopped rose petals or 1 teaspoon rose water or 8 to 9 strands of saffron (optional)"
//                 ],
//                 "category": "sweets",  
//                 "image": "kaju-katli.webp"
//               },
//               { 
//                 "name": "Kheer Recipe | Rice Kheer",
//                 "description": `A Rice Kheer recipe that is a keeper and my family’s heirloom recipe that you will love for its deliciousness. This traditional Indian rice pudding made with basmati rice, whole milk, sugar, nuts, saffron and cardamom is slow-cooked to perfection making for a rich, creamy kheer This delicious rice kheer can be made for any festival or celebration like Diwali or also as a sweet dessert which you can serve after meals.`,
//                 "ingredients": [
//                   "¼ cup basmati rice",
//                   "1 litre whole milk – 4 cups",
//                   "6 tablespoons sugar or add as required",
//                   "½ teaspoon cardamom powder or 5 to 6 green cardamoms powdered in mortar-pestle(choti elaichi powder)",
//                   "1 pinch saffron strands or 14 to 16 saffron strands",
//                   "1 tablespoon chopped or sliced almonds or blanched almonds",
//                   "1 tablespoon chopped or sliced cashews",
//                   "1 tablespoon chopped or sliced unsalted pistachios",
//                   "1 tablespoon golden raisins"
//                 ],
//                 "category": "sweets", 
//                 "image": "chawal-ki-kheer.webp"
//               },
//               {

//                 "name" :"Gajar Ki Barfi | Carrot Burfi",
//               "description":"Red Delhi carrots are in season now and time to make various carrot based recipes like carrot halwa, Gajar ka murabba. every year I make gajar halwa with the tender juicy carrots we get in winters .The recipe of carrot barfi is similar to the way gajar halwa is made. Here I have used milk powder in the burfi. So obviously the recipe does not have milk or condensed milk or khoya. Though you can use any recipe of gajar halwa and make the barfi. You just need to cook more than what we cook for gajar halwa, so that the sugar cooks more and the barfi sets after cooling.This is a quick recipe and does not take much time, apart from grating carrots. The recipe can also be doubled or tripled.Serve gajar ki barfi as a sweet or after dinner dessert.",
//               "ingredients":[
//                 "2 tablespoon Ghee (clarified butter)",
//                 "550 grams carrots about 4 cups grated carrots",
//                 "1 cup milk powder or 100 to 105 grams milk powder",
//                 "⅓ cup sugar or 65 to 70 grams sugar or add as required",
//                 "½ teaspoon cardamom powder",
//                 "20 unsalted pistachios, sliced or any other dry fruits (optional)",
//                 "½ teaspoon Ghee for greasing pan or tray or plate"

//               ],
//               "category":"sweets",
//               "image":"carrot-burfi-gajar-barfi.webp"
              
               
//               },
//               {
//                 "name":"Rasgulla Recipe",
//                 "description":"his popular Bengali dessert is beloved across the South Asian diaspora! Soft round dumplings made from chenna (an Indian cottage cheese) and semolina flour are simmered in a cardamom and rosewater scented sugar syrup for a tasty sweet that is simply lovely.While the origin story of this treat is hotly contested in some circles, I know rasgulla to be a famous Bengali sweet made from milk.The chenna is then kneaded with some semolina(rava or suji) or all purpose flour (maida). Round balls are made from the kneaded chenna, which are then cooked in sugar syrup.  The final touch is to scent the syrup with either aromatic cardamom or rosewater. The end result of this process is a pot full of sweet, syrupy cheese dumplings that are downright addictive",
//                 "ingredients":[
//                   "1 litre whole milk",
//                   "2 to 3 tablespoons lemon juice or add as required",
//                   "2 cups sugar or raw sugar",
//                   "1 litre water",
//                   "1 tablespoon milk – optional",
//                   "1 teaspoon sooji (rava or cream of wheat) or all purpose flour or cornstarch",
//                   "1 to 2 tablespoon rose water or kewra water or ½ teaspoon cardamom powder"
//                 ],
//                 "category":"sweets",
//                 "image":"rasgulla-recipe-1.jpg"
//               },
//               {

//                 "name":"The perfect cheeseburger",
//                 "description":"It’s a fast-food classic but not all cheeseburgers are created equal. Following these simple tips will result in the patty and bun of which dreams are madeWhich is the best beef for the burger A mince with a good amount of fat will make all the difference to the flavour of the patty. Look out for steak mince with a fat content of 15%. And if you have a good butcher near, ask for aged beef mince that has been minced with added fat. It will give the deepest, beefiest flavour, while staying tender and juicy. How do you make the best burger patty?  Getting a non-stick frying pan smoking hot and squashing the burgers into the pan will allow the patties to form charred, crispy edges – this is the fats and proteins on the surface of the meat caramelising. It’s best to only cook two at a time (unless barbecuing) because overcrowding the pan will lower its temperature, hindering this caramelisation process.",
//                 "ingredients":[
//                   "4 brioche burger buns, halved",
//                   "600g minced beef (15% fat)",
//                   "2 tbsp unsalted butter, melted",
//                   "10 sliced pickles, cut into pieces (we like Dino’s Famous Chilli Stacker Pickles)",
//                   "4 cheese slices",
//                 ],
//                 "category":"burger",
//                 "image":"Cheeseburger-74e8cde.webp"
//               },
//               {
//                 "name":"Steak burgers with peppercorn sauce dip",
//               "description":"Add a posh twist to your steak burgers with our homemade peppercorn sauce dip. Packed with melting cheese and sweet red onions, this recipe is great weekend comfort food for all the family to enjoy",
// "ingredients":[
//   "butter",
// "4 shallots, finely chopped",
// "1 tbsp sherry vinegar",
// "2 tsp black peppercorns, crushed",
// "150ml beef stock",
// "a good splash Worcestershire sauce",
// "5 tbsp double cream",
// "400g steak mince",
// "1 tsp garlic salt",
// "for frying oil",
// "4 slices emmental",
// "soft lettuce leaves",
// "4 brioche-style burger buns, toasted",
// "to serve red onion slices and gherkin slices"
// ],
// "category":"burger",
// "image":"OLI0218-Healthy-SwissCheeseBurgersPeppercornDip_020310-057f222.webp"
                
//               },
//               {
//                 "name":"The Brazil grill burger",
//                 "description":"All the flavours of Brazil crammed into one epic mouthful – peri peri bacon, smoky chimichurri relish, cumin-spiced onion rings, creamy lime and avocado mayo – it’s a bit of extra effort but take the challenge and you’ll be rewarded with a gold-medal burger",
//                 "ingredients":[
//                   "3-4 tbsp peri peri sauce",
// "  1 tbsp brown sugar",
// "  16 slices streaky bacon",
// "1kg beef mince",
// "  1 large red onion, peeled and grated",
// "  a small bunch flat-leaf parsley, chopped",
// " a good handful soft breadcrumbs",
// " 1 egg",
// "for frying vegetable oil",
// "16 slices emmental",
// "8 brioche burger buns, toasted",
// "to serve soft lettuce"
// ],
// "category":"burger",
//                 "image":"24531.webp"
//               },
//               {
//                 "name":"Freekeh and carrot burgers",
//                 "description":"Nutty, smoky freekeh is the next big protein-rich supergrain and well worth a try. Not only are these burgers healthy and easy to make, they might just be the best vegetarian burgers ever!",
//                 "ingredients":[
//                   "150g freekeh",
// "2 carrots, peeled and grated",
// "½ red onion, diced",
// "½ tsp smoked paprika",
// "1 egg, beaten",
// "400g tin pinto beans, rinsed and drained",
// "1 tbsp (optional) plain flour",
// "to serve (optional) burger buns, salad and hummus"

//                 ],
// "category":"burger",
// "image":"169.webp"
//               },
//               {
//                 "name":"Virgin Mojito Recipe | Mojito Mocktail",
//                 "description":"Mojitos are one of the best ways to cool-off on a really hot day, especially during Indian summers. This Virgin Mojito, a mocktail version, has fresh basil leaves (easily swap with mint) which makes it all the more cooling and refreshing. Just a few ingredients muddled together, you can’t get an easier Mojito Mocktail recipe than this. Go for this Lemon Mojito at once!An original mojito always uses fresh mint leaves, lemon or lime juice, sugar, white rum and club soda in its preparation. However, I decided to make a mocktail version and a virgin mojito recipe by omitting the rum and add a touch of basil instead of the mint. And the mojito drink simply turned out awesome.",
//                 "ingredients":[
//                  " 18 to 20 basil leaves (small-sized of or ⅛ cup small basil leaves – about 1 gram (alternatively use mint leaves)",
//                  " ▢2 lemon slices – thinly sliced",
//                   "▢2 tablespoons lemon juice – divided",
//                  " ▢1 pinch salt or add as required",
//                   "▢2 cups club soda or sparkling water or cold water",
//                  " ▢1 to 2 tablespoons sugar or add as per taste",
//                  " ▢ice cubes or crushed ice as required",
//                 ],
// "category":"beverage",

//                 "image":"lemon-mojito-recipe-1-280x280.jpg"
//               },
//               {
//                 "name":"Mango Juice Recipe",
//                 "description":"The best homemade mango juice recipe uses organic Alphonso mangoes for a terrifically sweet, nectar-like drink.I am somewhat of a mango juice expert, as I love all things mango. From Mango Milkshake and Mango Smoothie, to Mango Cheesecake and Mango Pudding, this bright and tropical fruit is absolutely my favorite to include in recipes. And if given the option between a slice of mango or a glass of juice, I’ll happily choose the mango nectar juice every time.Although I’ve been a big fan of mango juice for many years, I more than often prefer to make it specifically with organic alphonso mangoes. Hands-down these are the most prized variation of the fruit: they’re large with lots of delicious, perfectly sweet flesh.",
//                 "ingredients":[
//                   "2 cups chopped mangoes or 2 medium to large alphonso mangoes or any other sweet variety",
// "ice cubes – optional",
// "¼ cup water or any fruit juice – optional"
//                 ],
//                 "category":"beverage",
//                 "image":"mango-juice-recipe-1.webp"
//               },
//               {
//                 "name":"Chocolate Milkshake",
//                 "description":"Chocolate milkshake recipe with step by step photos – easy and quick recipe to prepare delicious chocolate shake made with cocoa powder.I wanted to share chocolate milkshake recipe from a long time. Finally made the recipe and took video. Chocolate milkshake also known as choco milkshake is a popular drink with all age groups. There are many methods of preparing chocolate milkshake. This is how I make it. I have always been making chocolate milkshake with cocoa powder.",
//                 "ingredients":[
//                  " ¼ cup warm water",
// "▢3 tablespoons cocoa powder",
// "▢¼ cup sugar or add as per taste",
// "2.5 cups chilled milk",
// "▢6 to 8 ice cubes – optional",
// "▢2 to 3 scoops chocolate ice cream – optional",
// "▢some chocolate sauce – optional",
//                 ],
//                 "category":"beverage",
//                 "image":"chocolate-milkshake-recipe.webp"
//               },
//               {
//                 "name":"Old Fashioned Whiskey Cocktail Recipe",
//                 "description":"Try this Old Fashioned Whisky Cocktail at home and surprise your friends with something delightful. This cocktail recipe is surely going to jazz up your weekend and is sure to be loved by all. Cherish your special day or weekend with this beverage recipe and add that much-needed lift in your celebrations. Blended wonderfully with scotch whisky, bitters and sugar cubes this cocktail will surely become your favourite. Serve this cocktail recipe at parties, buffets, festivals or any such special event and go crazy with its delectable flavours.",
//                 "ingredients":[
//                 "  50 ml scotch whiskey",
// "1 orange peel",
// "1 teaspoon sugar balls",
// "bitters as required",
//                 ],
//                 "category":"beverage",
//                 "image":"aNxer29Ug74wmXtiZUEedH.jpg"
//               },
//               {
//                 "name":"The Best Sausage Pizzas",
//                 "description":"What makes this recipe unique is the slow overnight fermentation of the dough. The flour has time to hydrate and relax, which makes the dough so much easier to roll out!",
//                 "ingredients":[
//                   "1 batch Best Pizza Dough",
// "1 pound bulk Italian sausage",
// "1 cup pizza sauce",
// "4 cups shredded part-skim mozzarella cheese",
// "1 medium red onion, sliced",
// "1 medium green pepper, chopped",
// "2 cups sliced fresh mushrooms",
// "Optional: Grated Parmesan cheese, crushed red pepper flakes and fresh oregano leaves"
//                 ],
//                 "category":"pizzas",
//                 "image":"The-Best-Sausage-Pizzas_EXPS_TOHFM20_245369-_E09_26_4b-29.jpg"
//               },
//               {
//                 "name":"Barbecued Chicken Pizzas",
//                 "description":"So fast and so easy with refrigerated pizza crust, these saucy, smoky pizzas make quick fans with their rustic, hot-off-the-grill flavor. They're perfect for impromptu cookouts and summer dinners on the patio",
//                 "ingredients":[
//                  " 2 boneless skinless chicken breast halves (6 ounces each)",
// "1/4 teaspoon pepper",
// "1 cup barbecue sauce, divided",
// "1 tube (13.8 ounces) refrigerated pizza crust",
// "2 teaspoons olive oil",
// "2 cups shredded Gouda cheese",
// "1 small red onion, halved and thinly sliced",
// "1/4 cup minced fresh cilantro"
//                 ],
//                 "category":"pizzas",
//                 "image":"Barbecued-Chicken-Pizzas_EXPS_SDJJ17_44709_C02_17_2b-12.jpg"
//               },
//               {
//                 "name":"Pepperoni Pan Pizza",
//                 "description":"Pepperoni Pan PizzaI've spent years trying to come up with the perfect pizza crust and sauce, and they're paired up in this recipe. I fix this crispy, savory pizza for my family often, and it really satisfies my husband and sons",
//                 "ingredients":[
//                  " 2-3/4 to 3 cups all-purpose flour",
// "1 package (1/4 ounce) active dry yeast",
// "1/4 teaspoon salt",
// "1 cup warm water (120° to 130°)",
// "1 tablespoon canola oil",
// "sauce:",
// "1 can (14-1/2 ounces) diced tomatoes, undrained",
// "1 can (6 ounces) tomato paste",
// "1 tablespoon canola oil",
// "1 teaspoon salt",

//                 ],
//                 "category":"pizzas",
//                 "image":"Pepperoni-Pan-Pizza_EXPS_HSCBZ17_9865_C07_25_2b-7.jpg"
//               },
//               {
//                 "name":"Garden-Fresh Grilled Veggie Pizza",
//                 "description":"I have four gardens, including one just for herbs, so I always have a pretty good spread of produce. I created this loaded-up pizza as a fun summer appetizer using some of my best garden goodies.",
//                 "ingredients":[
//                   "3 tablespoons olive oil",
// "3 garlic cloves, minced",
// "3 medium tomatoes, cut into 1/2-inch slices",
// "1 large sweet red pepper, halved, stemmed and seeded",
// "1 small zucchini, cut lengthwise into 1/4-inch slices",
// "1 small onion, cut crosswise into 1/2-inch slices",
// "1 teaspoon coarsely ground pepper",
// "1 prebaked 12-inch pizza crust",
// "1/3 cup spreadable garden vegetable cream cheese",
// "8 slices smoked provolone cheese, divided",
// "1/2 cup minced fresh basil, divided",
// "1/4 cup shredded carrots",
// "1 tablespoon minced fresh oregano",
// "1 teaspoon minced fresh thyme"
//                 ],
//                 "category":"pizzas",
//                 "image":"Garden-Fresh-Grilled-Veggie-Pizza_EXPS_SDJJ18_215090_B02_13_3b-5.jpg"
//               }


//         ])
        
//     } catch (error) {
//         console.log(error);
//     }
// }

  