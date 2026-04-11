const RECIPES = [
  {
    id: "r1",
    t: "Spicy Tomato Pasta",
    d: "Hurtig pasta med tomat og chili.",
    time: "25 min",
    diff: "Easy",
    tags: ["Italian", "Quick"],
    ing: {
      da: ["Pasta", "Tomater", "Hvidløg", "Chili", "Olivenolie", "Parmesan", "Basilikum"],
      en: ["Pasta", "Tomatoes", "Garlic", "Chili", "Olive oil", "Parmesan", "Basil"]
    },
    steps: {
      da: [
        "Kog pasta efter anvisningen på pakken.",
        "Steg hvidløg og chili i olivenolie.",
        "Tilsæt tomater og lad saucen simre.",
        "Vend den kogte pasta i saucen.",
        "Top med parmesan og basilikum."
      ],
      en: [
        "Cook the pasta according to the package instructions.",
        "Fry the garlic and chili in olive oil.",
        "Add the tomatoes and let the sauce simmer.",
        "Mix the cooked pasta into the sauce.",
        "Top with parmesan and basil."
      ]
    },
    img: "images/spicy-tomato-pasta.jpg"
  },
  {
    id: "r2",
    t: "Red Pepper Shakshuka",
    d: "Æg i krydret tomat- og pebersauce.",
    time: "35 min",
    diff: "Medium",
    tags: ["One-pan", "Vegetarian"],
    ing: {
      da: ["Æg", "Peberfrugt", "Tomater", "Løg", "Spidskommen", "Paprika"],
      en: ["Eggs", "Bell pepper", "Tomatoes", "Onion", "Cumin", "Paprika"]
    },
    steps: {
      da: [
        "Steg løg og peberfrugt bløde på panden.",
        "Tilsæt tomater og krydderier.",
        "Lad saucen simre i nogle minutter.",
        "Lav små fordybninger og slå æggene ud i saucen.",
        "Læg låg på og tilbered til æggene er færdige."
      ],
      en: [
        "Fry the onion and bell pepper until soft.",
        "Add the tomatoes and spices.",
        "Let the sauce simmer for a few minutes.",
        "Make small holes and crack the eggs into the sauce.",
        "Cover with a lid and cook until the eggs are done."
      ]
    },
    img: "images/red-pepper-shakshuka.jpg"
  },
  {
    id: "r3",
    t: "Bibimbap Bowl",
    d: "Risret med grøntsager og gochujang.",
    time: "45 min",
    diff: "Medium",
    tags: ["Bowl", "Umami"],
    ing: {
      da: ["Ris", "Spinat", "Gulerod", "Svampe", "Æg", "Gochujang"],
      en: ["Rice", "Spinach", "Carrot", "Mushrooms", "Egg", "Gochujang"]
    },
    steps: {
      da: [
        "Kog risene.",
        "Steg eller blancher grøntsagerne hver for sig.",
        "Steg svampene til de får farve.",
        "Spejl et æg.",
        "Anret ris, grøntsager og æg i en skål og servér med gochujang."
      ],
      en: [
        "Cook the rice.",
        "Fry or blanch the vegetables separately.",
        "Cook the mushrooms until browned.",
        "Fry an egg.",
        "Serve the rice, vegetables, and egg in a bowl with gochujang."
      ]
    },
    img: "images/bibimbap-bowl.jpg"
  },
  {
    id: "r4",
    t: "Crispy Chicken Wrap",
    d: "Sprød chicken wrap med røget sauce.",
    time: "30 min",
    diff: "Easy",
    tags: ["Lunch", "Comfort"],
    ing: {
      da: ["Kylling", "Tortillas", "Salat", "Yoghurt", "Paprika"],
      en: ["Chicken", "Tortillas", "Lettuce", "Yogurt", "Paprika"]
    },
    steps: {
      da: [
        "Steg eller bag kyllingen sprød.",
        "Bland yoghurt og paprika til en sauce.",
        "Varm tortillas kort.",
        "Fyld tortillas med salat, kylling og sauce.",
        "Rul wraps sammen og servér."
      ],
      en: [
        "Fry or bake the chicken until crispy.",
        "Mix yogurt and paprika into a sauce.",
        "Warm the tortillas briefly.",
        "Fill the tortillas with lettuce, chicken, and sauce.",
        "Roll the wraps and serve."
      ]
    },
    img: "images/crispy-chicken-wrap.jpg"
  },
  {
    id: "r5",
    t: "Garlic Butter Salmon",
    d: "Laks stegt i hvidløgssmør.",
    time: "20 min",
    diff: "Easy",
    tags: ["Quick", "Protein"],
    ing: {
      da: ["Laks", "Smør", "Hvidløg", "Citron", "Persille"],
      en: ["Salmon", "Butter", "Garlic", "Lemon", "Parsley"]
    },
    steps: {
      da: [
        "Krydr laksen med salt og peber.",
        "Smelt smør på panden og tilsæt hvidløg.",
        "Steg laksen et par minutter på hver side.",
        "Tilsæt citronsaft.",
        "Drys med persille og servér."
      ],
      en: [
        "Season the salmon with salt and pepper.",
        "Melt butter in a pan and add the garlic.",
        "Cook the salmon for a few minutes on each side.",
        "Add lemon juice.",
        "Sprinkle with parsley and serve."
      ]
    },
    img: "images/garlic-butter-salmon.jpg"
  },
  {
    id: "r6",
    t: "Smoky Bean Tacos",
    d: "Hurtige tacos med bønner og lime.",
    time: "20 min",
    diff: "Easy",
    tags: ["Vegetarian", "Quick"],
    ing: {
      da: ["Bønner", "Tacoskaller", "Løg", "Lime", "Spidskommen"],
      en: ["Beans", "Taco shells", "Onion", "Lime", "Cumin"]
    },
    steps: {
      da: [
        "Steg løg med spidskommen.",
        "Tilsæt bønner og varm dem igennem.",
        "Varm tacoskallerne.",
        "Fyld skallerne med bønnefyldet.",
        "Top med lime og servér."
      ],
      en: [
        "Fry the onion with cumin.",
        "Add the beans and heat them through.",
        "Warm the taco shells.",
        "Fill the shells with the bean mixture.",
        "Top with lime and serve."
      ]
    },
    img: "images/smoky-bean-tacos.jpg"
  },
{
  id: "r7",
  t: "Krabby Patty",
  d: "Den legendariske burger fra The Krusty Krab – her som en rigtig opskrift inspireret af serien.",
  time: "35 min",
  diff: "Medium",
  tags: ["Burger", "TV-inspired"],
  ing: {
    da: [
      "4 burgerboller",
      "4 veggie burgerbøffer",
      "4 skiver ost",
      "1 rødløg i skiver",
      "2 tomater i skiver",
      "Salatblade",
      "Syltede agurker",
      "Ketchup",
      "Sennep",
      "Smør eller olie til stegning"
    ],
    en: [
      "4 burger buns",
      "4 veggie burger patties",
      "4 slices of cheese",
      "1 red onion, sliced",
      "2 tomatoes, sliced",
      "Lettuce leaves",
      "Pickles",
      "Ketchup",
      "Mustard",
      "Butter or oil for frying"
    ]
  },
  steps: {
    da: [
      "Varm en pande op og steg burgerbøfferne efter anvisningen, til de er gyldne og gennemvarme.",
      "Lun burgerbollerne let på en tør pande eller i ovnen.",
      "Læg ost på de varme bøffer, så den smelter let.",
      "Smør den nederste bolle med ketchup og den øverste med sennep.",
      "Saml burgeren med salat, bøf med ost, løg, tomat og syltede agurker.",
      "Læg topbollen på og servér straks."
    ],
    en: [
      "Heat a pan and cook the veggie patties according to the instructions until golden and heated through.",
      "Warm the burger buns lightly in a dry pan or in the oven.",
      "Place cheese on the hot patties so it melts slightly.",
      "Spread ketchup on the bottom bun and mustard on the top bun.",
      "Assemble the burger with lettuce, patty with cheese, onion, tomato, and pickles.",
      "Place the top bun on and serve immediately."
    ]
  },
  img: "images/krabby-patty.png"
},
  {
    id: "r8",
    t: "Ramen-Style Soup",
    d: "Varm nudelsuppe med toppings.",
    time: "30 min",
    diff: "Medium",
    tags: ["Soup", "Comfort"],
    ing: {
      da: ["Nudler", "Bouillon", "Soja", "Ingefær", "Æg"],
      en: ["Noodles", "Broth", "Soy sauce", "Ginger", "Egg"]
    },
    steps: {
      da: [
        "Kog bouillon med soja og ingefær.",
        "Kog nudlerne separat.",
        "Kog eller marinér æg efter ønske.",
        "Fordel nudler i skåle.",
        "Hæld suppen over og top med æg."
      ],
      en: [
        "Boil the broth with soy sauce and ginger.",
        "Cook the noodles separately.",
        "Boil or marinate the eggs as desired.",
        "Divide the noodles into bowls.",
        "Pour over the soup and top with egg."
      ]
    },
    img: "images/ramen-style-soup.jpg"
  },
  {
    id: "r9",
    t: "Chocolate Mug Cake",
    d: "Varm chokoladekage på få minutter.",
    time: "8 min",
    diff: "Easy",
    tags: ["Dessert", "Quick"],
    ing: {
      da: ["Mel", "Kakao", "Sukker", "Mælk", "Smør"],
      en: ["Flour", "Cocoa", "Sugar", "Milk", "Butter"]
    },
    steps: {
      da: [
        "Bland alle ingredienser i et krus.",
        "Rør dejen glat.",
        "Sæt kruset i mikroovnen.",
        "Bag i kort tid til kagen har sat sig.",
        "Servér med det samme."
      ],
      en: [
        "Mix all the ingredients in a mug.",
        "Stir until the batter is smooth.",
        "Place the mug in the microwave.",
        "Cook briefly until the cake is set.",
        "Serve immediately."
      ]
    },
    img: "images/chocolate-mug-cake.jpg"
  },
  {
    id: "r10",
    t: "Caesar Salad",
    d: "Sprød salat med klassisk dressing.",
    time: "15 min",
    diff: "Easy",
    tags: ["Salad", "Classic"],
    ing: {
      da: ["Romaine", "Croutoner", "Parmesan", "Hvidløg", "Citron"],
      en: ["Romaine", "Croutons", "Parmesan", "Garlic", "Lemon"]
    },
    steps: {
      da: [
        "Skyl og snit romainesalat.",
        "Lav en hurtig dressing med citron og hvidløg.",
        "Vend salaten i dressingen.",
        "Tilsæt croutoner og parmesan.",
        "Servér straks."
      ],
      en: [
        "Wash and chop the romaine lettuce.",
        "Make a quick dressing with lemon and garlic.",
        "Toss the lettuce in the dressing.",
        "Add croutons and parmesan.",
        "Serve immediately."
      ]
    },
    img: "images/caesar-salad.jpg"
  },
  {
    id: "r11",
    t: "Paneer Tikka Skillet",
    d: "Krydret paneer med peberfrugt.",
    time: "25 min",
    diff: "Medium",
    tags: ["Vegetarian", "Spiced"],
    ing: {
      da: ["Paneer", "Peberfrugt", "Løg", "Yoghurt", "Krydderier"],
      en: ["Paneer", "Bell pepper", "Onion", "Yogurt", "Spices"]
    },
    steps: {
      da: [
        "Vend paneer i yoghurt og krydderier.",
        "Steg løg og peberfrugt på panden.",
        "Tilsæt paneer og steg videre.",
        "Lad retten få farve og varme igennem.",
        "Servér varm."
      ],
      en: [
        "Coat the paneer in yogurt and spices.",
        "Fry the onion and bell pepper in a pan.",
        "Add the paneer and continue cooking.",
        "Let the dish brown slightly and heat through.",
        "Serve hot."
      ]
    },
    img: "images/paneer-tikka-skillet.jpg"
  },
  {
    id: "r12",
    t: "Overnight Oats",
    d: "Kolde cremede havregryn med bær.",
    time: "10 min",
    diff: "Easy",
    tags: ["Breakfast", "No-cook"],
    ing: {
      da: ["Havregryn", "Mælk", "Yoghurt", "Bær", "Honning"],
      en: ["Oats", "Milk", "Yogurt", "Berries", "Honey"]
    },
    steps: {
      da: [
        "Bland havregryn, mælk og yoghurt.",
        "Rør honning i.",
        "Sæt blandingen på køl natten over.",
        "Top med bær næste dag.",
        "Servér kold."
      ],
      en: [
        "Mix the oats, milk, and yogurt.",
        "Stir in the honey.",
        "Refrigerate the mixture overnight.",
        "Top with berries the next day.",
        "Serve cold."
      ]
    },
    img: "images/overnight-oats.jpg"
  }
];

const INSP = ["r7","r1","r8","r3","r6","r2","r9","r5","r10","r11"];
const TOP10 = ["r7","r2","r5","r1","r9","r10","r12","r8"];

const LS_RATE = "ff_rate";
const LS_LIST = "ff_list";
const LS_LANG = "ff_lang";
const LS_USERS = "ff_users";
const LS_ACTIVE_USER = "ff_active_user";

const TEXT = {
  da: {
    chooseTitle: "Vælg en sektion",
    inspiration: "Inspiration",
    inspirationSub: "Idéer til at komme i gang",
    top10: "Top 10",
    top10Sub: "Mest populære opskrifter",
    yourchoice: "Your Choice",
    yourchoiceSub: "Dine gemte opskrifter",
    frontText: "Klar til at finde en opskrift? Søg efter navn eller ingredienser.",
    frontPlaceholder: "Søg efter opskrifter...",
    frontButton: "Søg",
    sectionPlaceholder: "Søg i denne sektion...",
    clear: "Clear",
    preview: "Preview:",
    previewDefault: "Hold musen over en opskrift for at se preview",
    noResults: "Ingen opskrifter fundet.",
    back: "← Tilbage til forsiden",
    ingredients: "Ingredienser",
    rating: "Vurdering",
    noRating: "Ingen vurdering endnu.",
    yourRating: "Din vurdering:",
    addChoice: "+ Your Choice",
    removeChoice: "✓ In Your Choice (Remove)",
    noSavedTitle: "Ingen gemte opskrifter",
    noSavedDesc: "Gem en opskrift for at se den her.",
    searchResults: "Søgeresultater",
    noSearchTitle: "Ingen resultater",
    noSearchDesc: "Prøv at søge efter en anden opskrift eller ingrediens.",
    userLoggedOut: "Ikke logget ind",
    userLoggedIn: "Logget ind som",
    email: "E-mail",
    password: "Adgangskode",
    createProfile: "Opret profil",
    login: "Log ind",
    logout: "Log ud",
    createSuccess: "Profil oprettet.",
    loginSuccess: "Du er nu logget ind.",
    loginFail: "Forkert e-mail eller adgangskode.",
    createFail: "E-mail findes allerede.",
    fillFields: "Udfyld e-mail og adgangskode.",
    loggedOutMessage: "Du er logget ud.",
    recipeNotFound: "Opskrift ikke fundet",
    recipeMissingText: "Denne opskrift findes ikke."
  },
  en: {
    chooseTitle: "Choose a section",
    inspiration: "Inspiration",
    inspirationSub: "Ideas to get started",
    top10: "Top 10",
    top10Sub: "Most popular recipes",
    yourchoice: "Your Choice",
    yourchoiceSub: "Your saved recipes",
    frontText: "Ready to find a recipe? Search by name or ingredients.",
    frontPlaceholder: "Search recipes...",
    frontButton: "Search",
    sectionPlaceholder: "Search in this section...",
    clear: "Clear",
    preview: "Preview:",
    previewDefault: "Hover a recipe to preview it",
    noResults: "No recipes found.",
    back: "← Back to front page",
    ingredients: "Ingredients",
    rating: "Rating",
    noRating: "No rating yet.",
    yourRating: "Your rating:",
    addChoice: "+ Your Choice",
    removeChoice: "✓ In Your Choice (Remove)",
    noSavedTitle: "No saved recipes",
    noSavedDesc: "Save a recipe to see it here.",
    searchResults: "Search Results",
    noSearchTitle: "No results",
    noSearchDesc: "Try searching for another recipe or ingredient.",
    userLoggedOut: "Not logged in",
    userLoggedIn: "Logged in as",
    email: "E-mail",
    password: "Password",
    createProfile: "Create profile",
    login: "Log in",
    logout: "Log out",
    createSuccess: "Profile created.",
    loginSuccess: "You are now logged in.",
    loginFail: "Wrong e-mail or password.",
    createFail: "E-mail already exists.",
    fillFields: "Fill in e-mail and password.",
    loggedOutMessage: "You are logged out.",
    recipeNotFound: "Recipe not found",
    recipeMissingText: "This recipe does not exist."
  }
};