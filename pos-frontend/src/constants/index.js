import appa from '../assets/images/appa.jpg';
import biriyani from '../assets/images/biriyani.jpeg';
import crabs from '../assets/images/crabs.jpg';
import kiribath from '../assets/images/kiribath.jpg';
import kottu from '../assets/images/kottu.jpg';
import lampris from '../assets/images/lampris.jpg';
import pittu from '../assets/images/pittu.jpg';
import riceandcurry from '../assets/images/riceandcurry.jpg';
import Seafoodrice from '../assets/images/Seafoodrice.jpg';
import yellowrice from '../assets/images/yellowrice.jpg';

export const MostPopuler = [
    {
      id: 1,
      image: appa,
      name: 'Hoppers',
      numberOfOrders: 250,
    },
    {
      id: 2,
      image: biriyani,
      name: 'Biriyani',
      numberOfOrders: 190,
    },
    {
      id: 3,
      image: crabs,
      name: 'Jaffna Crab Curry',
      numberOfOrders: 300,
    },
    {
      id: 4,
      image: kiribath ,
      name: 'Milk Rice',
      numberOfOrders: 220,
    },
    {
      id: 5,
      image: kottu,
      name: 'Kottu',
      numberOfOrders: 270,
    },
    {
      id: 6,
      image: lampris,
      name: 'Lampris',
      numberOfOrders: 180,
    },
    {
      id: 7,
      image: pittu,
      name: 'Pittu',
      numberOfOrders: 210,
    },
    {
      id: 8,
      image: riceandcurry,
      name: 'Rice & Curry',
      numberOfOrders: 310,
    },
    {
      id: 9,
      image: Seafoodrice,
      name: 'Sea Food Rice',
      numberOfOrders: 140,
    },
    {
      id: 10,
      image: yellowrice,
      name: 'Yellow Rice',
      numberOfOrders: 160,
    },
  ];



  export const tables = [
    { id: 1, name: "Table 1", status: "Booked", initial: "AM", seats: 4 },
    { id: 2, name: "Table 2", status: "Available", initial: "MB", seats: 6 },
    { id: 3, name: "Table 3", status: "Booked", initial: "JS", seats: 2 },
    { id: 4, name: "Table 4", status: "Available", initial: "HR", seats: 4 },
    { id: 5, name: "Table 5", status: "Booked", initial: "PL", seats: 3 },
    { id: 6, name: "Table 6", status: "Available", initial: "RT", seats: 4 },
    { id: 7, name: "Table 7", status: "Booked", initial: "LC", seats: 5 },
    { id: 8, name: "Table 8", status: "Available", initial: "DP", seats: 5 },
    { id: 9, name: "Table 9", status: "Booked", initial: "NK", seats: 6 },
    { id: 10, name: "Table 10", status: "Available", initial: "SB", seats: 6 },
    { id: 11, name: "Table 11", status: "Booked", initial: "GT", seats: 4 },
    { id: 12, name: "Table 12", status: "Available", initial: "JS", seats: 6 },
    { id: 13, name: "Table 13", status: "Booked", initial: "EK", seats: 2 },
    { id: 14, name: "Table 14", status: "Available", initial: "QN", seats: 6 },
    { id: 15, name: "Table 15", status: "Booked", initial: "TW", seats: 3 }
  ];


  export const startersItem = [
    {
      id: 1.1,
      name: "Paneer Tikka",
      price: 250,
      category: "Vegetarian"
    },
    {
      id: 2.1,
      name: "Chicken Tikka",
      price: 300,
      category: "Non-Vegetarian"
    },
    {
      id: 3.1,
      name: "Tandoori Chicken",
      price: 350,
      category: "Non-Vegetarian"
    },
    {
      id: 4.1,
      name: "Samosa",
      price: 100,
      category: "Vegetarian"
    },
    {
      id: 5.1,
      name: "Aloo Tikki",
      price: 120,
      category: "Vegetarian"
    },
    {
      id: 6.1,
      name: "Hara Bhara Kebab",
      price: 220,
      category: "Vegetarian"
    }
  ];
  
export const mainCourse = [
  {
    id: 1.2,
    name: "Butter Chicken",
    price: 400,
    category: "Non-Vegetarian"
  },
  {
    id: 2.2,
    name: "Paneer Butter Masala",
    price: 350,
    category: "Vegetarian"
  },
  {
    id: 3.2,
    name: "Chicken Biryani",
    price: 450,
    category: "Non-Vegetarian"
  },
  {
    id: 4.2,
    name: "Dal Makhani",
    price: 180,
    category: "Vegetarian"
  },
  {
    id: 5.2,
    name: "Kadai Paneer",
    price: 300,
    category: "Vegetarian"
  },
  {
    id: 6.2,
    name: "Rogan Josh",
    price: 500,
    category: "Non-Vegetarian"
  }
];

export const beverages = [
  {
    id: 1.3,
    name: "Masala Chai",
    price: 50,
    category: "Hot"
  },
  {
    id: 2.3,
    name: "Lemon Soda",
    price: 80,
    category: "Cold"
  },
  {
    id: 3.3,
    name: "Mango Lassi",
    price: 120,
    category: "Cold"
  },
  {
    id: 4.3,
    name: "Cold Coffee",
    price: 150,
    category: "Cold"
  },
  {
    id: 5.3,
    name: "Fresh Lime Water",
    price: 60,
    category: "Cold"
  },
  {
    id: 6.3,
    name: "Iced Tea",
    price: 100,
    category: "Cold"
  }
];

export const soups = [
  {
    id: 1.4,
    name: "Tomato Soup",
    price: 120,
    category: "Vegetarian"
  },
  {
    id: 2.4,
    name: "Sweet Corn Soup",
    price: 130,
    category: "Vegetarian"
  },
  {
    id: 3.4,
    name: "Hot & Sour Soup",
    price: 140,
    category: "Vegetarian"
  },
  {
    id: 4.4,
    name: "Chicken Clear Soup",
    price: 160,
    category: "Non-Vegetarian"
  },
  {
    id: 5.4,
    name: "Mushroom Soup",
    price: 150,
    category: "Vegetarian"
  },
  {
    id: 6.4,
    name: "Lemon Coriander Soup",
    price: 110,
    category: "Vegetarian"
  }
];

export const desserts = [
  {
    id: 1.5,
    name: "Gulab Jamun",
    price: 100,
    category: "Vegetarian"
  },
  {
    id: 2.5,
    name: "Kulfi",
    price: 150,
    category: "Vegetarian"
  },
  {
    id: 3.5,
    name: "Chocolate Lava Cake",
    price: 250,
    category: "Vegetarian"
  },
  {
    id: 4.5,
    name: "Ras Malai",
    price: 180,
    category: "Vegetarian"
  }
];

export const pizzas = [
  {
    id: 1.6,
    name: "Margherita Pizza",
    price: 350,
    category: "Vegetarian"
  },
  {
    id: 2.6,
    name: "Veg Supreme Pizza",
    price: 400,
    category: "Vegetarian"
  },
  {
    id: 3.6,
    name: "Pepperoni Pizza",
    price: 450,
    category: "Non-Vegetarian"
  }
];

export const alcoholicDrinks = [
  {
    id: 1.7,
    name: "Beer",
    price: 200,
    category: "Alcoholic"
  },
  {
    id: 2.7,
    name: "Whiskey",
    price: 500,
    category: "Alcoholic"
  },
  {
    id: 3.7,
    name: "Vodka",
    price: 450,
    category: "Alcoholic"
  },
  {
    id: 4.7,
    name: "Rum",
    price: 350,
    category: "Alcoholic"
  },
  {
    id: 5.7,
    name: "Tequila",
    price: 600,
    category: "Alcoholic"
  },
  {
    id: 6.7,
    name: "Cocktail",
    price: 400,
    category: "Alcoholic"
  }
];

export const salads = [
  {
    id: 1.8,
    name: "Caesar Salad",
    price: 200,
    category: "Vegetarian"
  },
  {
    id: 2.8,
    name: "Greek Salad",
    price: 250,
    category: "Vegetarian"
  },
  {
    id: 3.8,
    name: "Fruit Salad",
    price: 150,
    category: "Vegetarian"
  },
  {
    id: 4.8,
    name: "Chicken Salad",
    price: 300,
    category: "Non-Vegetarian"
  },
  {
    id: 5.8,
    name: "Tuna Salad",
    price: 350,
  
  }
];

  export const menus = [
  { id: 1, name: "Starters", bgColor: "#b73e3e" ,icon: "🍲", items: startersItem },
  { id: 2, name: "Main Course", bgColor: "#5b45b0" ,icon: "🍛", items: mainCourse },
  { id: 3, name: "Beverages", bgColor: "#7f167f" ,icon: "🍹", items: beverages },
  { id: 4, name: "Soups", bgColor: "#735f32" ,icon: "🍜", items: soups },
  { id: 5, name: "Desserts", bgColor: "#1d2569" ,icon: "🍰", items: desserts },
  { id: 6, name: "Pizzas", bgColor: "#285430" ,icon: "🍕", items: pizzas },
  { id: 7, name: "Alcoholic Drinks", bgColor: "#b73e3e" ,icon: "🍺", items: alcoholicDrinks },
  { id: 8, name: "Salads", bgColor: "#5b45b0" ,icon: "🥗", items: salads }
];