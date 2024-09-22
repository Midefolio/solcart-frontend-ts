

const solCatCategories = [
    {
      category: "Vehicles",
      icon: "🚗",
      subcategories: [
        {
          name: "Cars",
          types: ["SUVs", "Sedans", "Trucks", "Buses", "Vans"],
        },
        {
          name: "Motorcycles & Scooters",
          types: ["Motorcycles", "Scooters", "ATVs"],
        },
        {
          name: "Vehicle Parts & Accessories",
          types: [
            "Tyres & Rims",
            "Audio & Music Equipment",
            "Batteries",
            "Engine & Drivetrain",
            "Lights & Indicators",
            "Brakes",
            "Suspension",
            "Other Parts",
          ],
        },
        {
          name: "Trucks & Trailers",
          types: ["Trucks", "Trailers"],
        },
        {
          name: "Buses",
          types: ["Mini Buses", "Coaches"],
        },
        {
          name: "Heavy Equipment",
          types: ["Excavators", "Bulldozers", "Cranes"],
        },
      ],
    },
    {
      category: "Property",
      icon: "🏠",
      subcategories: [
        {
          name: "Houses & Apartments for Sale",
          types: ["Houses", "Apartments", "Duplexes", "Mansions", "Bungalows"],
        },
        {
          name: "Houses & Apartments for Rent",
          types: ["Houses", "Apartments", "Room & Parlor", "Self-contained"],
        },
        {
          name: "Land & Plots",
          types: ["Residential Land", "Commercial Land", "Industrial Land", "Agricultural Land", "Mixed-use Land"],
        },
        {
          name: "Commercial Property for Sale",
          types: ["Shops", "Offices", "Warehouses"],
        },
        {
          name: "Commercial Property for Rent",
          types: ["Shops", "Offices", "Warehouses"],
        },
        {
          name: "Event Centers & Venues",
          types: ["Halls", "Outdoor Venues"],
        },
        {
          name: "Short Let",
          types: ["Vacation Rentals", "Guest Houses"],
        },
      ],
    },
    {
      category: "Mobile Phones & Tablets",
      icon: "📱",
      subcategories: [
        {
          name: "Mobile Phones",
          types: ["Smartphones", "Feature Phones"],
        },
        {
          name: "Mobile Phone Accessories",
          types: ["Cases", "Screen Protectors", "Chargers", "Batteries", "Headsets"],
        },
        {
          name: "Tablets",
          types: ["Android Tablets", "iPads"],
        },
        {
          name: "Tablet Accessories",
          types: ["Cases", "Screen Protectors", "Chargers", "Batteries", "Stylus Pens"],
        },
      ],
    },
    {
      category: "Electronics",
      icon: "💻",
      subcategories: [
        {
          name: "TV & DVD Equipment",
          types: ["Televisions", "DVD Players", "Projectors", "Satellite & Cable TV", "TV & DVD Accessories"],
        },
        {
          name: "Audio & Music Equipment",
          types: ["Speakers", "Home Theaters", "Musical Instruments", "Microphones", "Mixers"],
        },
        {
          name: "Computers & Laptops",
          types: ["Laptops", "Desktops", "Monitors", "Networking Products", "Printers & Scanners", "Computer Accessories"],
        },
        {
          name: "Cameras, Video Cameras & Accessories",
          types: ["Digital Cameras", "Camcorders", "Surveillance Cameras", "Camera Accessories"],
        },
        {
          name: "Game Consoles",
          types: ["PlayStation", "Xbox", "Nintendo", "Handheld Consoles"],
        },
        {
          name: "Security & Surveillance",
          types: ["CCTV Cameras", "Alarm Systems", "Doorbell Cameras"],
        },
        {
          name: "Software",
          types: ["Operating Systems", "Office Software", "Antivirus", "Design Software"],
        },
        {
          name: "Storage Devices",
          types: ["External Hard Drives", "USB Flash Drives", "Memory Cards"],
        },
      ],
    },
    {
      category: "Home, Furniture & Appliances",
      icon: "🛋️",
      subcategories: [
        {
          name: "Furniture",
          types: ["Living Room Furniture", "Bedroom Furniture", "Office Furniture", "Outdoor Furniture", "Other Furniture"],
        },
        {
          name: "Home Appliances",
          types: ["Refrigerators", "Air Conditioners", "Washing Machines", "Cookers", "Microwaves", "Fans", "Water Heaters"],
        },
        {
          name: "Kitchen & Dining",
          types: ["Cookware & Bakeware", "Kitchen Utensils", "Small Kitchen Appliances", "Dinnerware & Serveware"],
        },
        {
          name: "Home Accessories",
          types: ["Curtains & Blinds", "Carpets & Rugs", "Clocks", "Wall Art"],
        },
        {
          name: "Garden",
          types: ["Outdoor Furniture", "Plants & Seeds", "Garden Tools"],
        },
        {
          name: "Lighting",
          types: ["Ceiling Lights", "Table Lamps", "Outdoor Lighting"],
        },
        {
          name: "Repair & Construction",
          types: ["Building Materials", "Tools", "Paint & Finishes"],
        },
      ],
    },
    {
      category: "Health & Beauty",
      icon: "💄",
      subcategories: [
        {
          name: "Makeup",
          types: ["Face Makeup", "Eye Makeup", "Lip Makeup", "Makeup Tools & Accessories"],
        },
        {
          name: "Skin Care",
          types: ["Face Care", "Body Care", "Sun Care", "Treatments & Serums"],
        },
        {
          name: "Hair Beauty",
          types: ["Hair Extensions & Wigs", "Hair Care", "Hair Styling Tools"],
        },
        {
          name: "Fragrance",
          types: ["Perfume", "Body Spray", "Deodorant"],
        },
        {
          name: "Tools & Accessories",
          types: ["Hair Dryers", "Straighteners", "Makeup Brushes"],
        },
        {
          name: "Sexual Wellness",
          types: ["Contraceptives", "Lubricants", "Enhancement Products"],
        },
        {
          name: "Vitamins & Supplements",
          types: ["Multivitamins", "Protein Supplements", "Herbal Supplements"],
        },
      ],
    },
    {
      category: "Fashion",
      icon: "👗",
      subcategories: [
        {
          name: "Clothing",
          types: ["Men's Clothing", "Women's Clothing", "Unisex Clothing", "Children's Clothing"],
        },
        {
          name: "Shoes",
          types: ["Men's Shoes", "Women's Shoes", "Unisex Shoes", "Children's Shoes"],
        },
        {
          name: "Bags",
          types: ["Handbags", "Backpacks", "Luggage & Travel Bags", "Wallets & Purses"],
        },
        {
          name: "Accessories",
          types: ["Belts", "Hats", "Scarves", "Sunglasses"],
        },
        {
          name: "Jewelry",
          types: ["Necklaces", "Rings", "Bracelets", "Earrings"],
        },
        {
          name: "Watches",
          types: ["Men's Watches", "Women's Watches", "Unisex Watches", "Smartwatches"],
        },
        {
          name: "Wedding Wear",
          types: ["Bridal Gowns", "Groom's Attire", "Bridesmaid Dresses", "Wedding Accessories"],
        },
      ],
    },
    {
      category: "Sports, Arts & Outdoors",
      icon: "⚽",
      subcategories: [
        {
          name: "Sports Equipment",
          types: ["Fitness & Gym Equipment", "Team Sports", "Outdoor Sports", "Indoor Sports"],
        },
        {
          name: "Camping Gear",
          types: ["Tents", "Sleeping Bags", "Outdoor Furniture", "Camping Tools & Equipment"],
        },
        {
          name: "Musical Instruments",
          types: ["Guitars", "Keyboards", "Percussion", "Wind Instruments", "String Instruments"],
        },
        {
          name: "Arts & Crafts",
          types: ["Painting Supplies", "Crafting Tools", "Drawing Materials"],
        },
        {
          name: "Books & Games",
          types: ["Board Games", "Puzzles", "Books"],
        },
      ],
    },
    {
      category: "Jobs",
      icon: "💼",
      subcategories: [
        {
          name: "Job Seekers",
          types: ["CVs & Resumes"],
        },
        {
          name: "Job Vacancies",
          types: ["Full-Time Jobs", "Part-Time Jobs", "Contract Jobs", "Internships", "Temporary Jobs"],
        },
      ],
    },
    {
      category: "Services",
      icon: "🛠️",
      subcategories: [
        {
          name: "Automotive Services",
          types: ["Car Repairs & Servicing", "Car Wash & Cleaning", "Car Rental Services"],
        },
        {
          name: "Building & Trade Services",
          types: ["Construction Services", "Electrical Services", "Plumbing Services", "Painting & Decorating"],
        },
        {
          name: "Cleaning Services",
          types: ["Residential Cleaning", "Commercial Cleaning", "Laundry Services", "Pest Control"],
        },
        {
          name: "Health & Beauty Services",
          types: ["Hairdressing", "Makeup & Skin Care", "Spa & Wellness", "Personal Training"],
        },
        {
          name: "Event Services",
          types: ["Catering", "Photography & Video", "Event Planning", "Sound & Lighting"],
        },
        {
          name: "Business Services",
          types: ["Printing & Publishing", "Marketing & Advertising", "Financial Services"],
        },
        {
          name: "Education & Training",
          types: ["Tutoring", "Online Courses", "Workshops & Seminars"],
        },
        {
          name: "Repair Services",
          types: ["Electronics Repair", "Home Appliances Repair", "Furniture Repair"],
        },
      ],
    },
    {
      category: "Seeking Work - CVs",
      icon: "📄",
      subcategories: [
        {
          name: "CVs available for various job roles",
          types: ["Admin", "Customer Service", "IT", "Sales"],
        },
      ],
    },
    {
      category: "Babies & Kids",
      icon: "🍼",
      subcategories: [
        {
          name: "Baby & Child Care",
          types: ["Diapers & Wipes", "Feeding & Nursing", "Bathing & Grooming", "Baby Safety"],
        },
        {
          name: "Toys",
          types: ["Educational Toys", "Soft Toys", "Action Figures", "Outdoor Play"],
        },
        {
          name: "Kids' Clothing & Shoes",
          types: ["Boys' Clothing", "Girls' Clothing", "Boys' Shoes", "Girls' Shoes"],
        },
        {
          name: "Maternity & Pregnancy",
          types: ["Maternity Wear", "Pregnancy Pillows", "Maternity Skincare"],
        },
      ],
    },
    {
      category: "Animals & Pets",
      icon: "🐕",
      subcategories: [
        {
          name: "Dogs & Puppies",
          types: ["German Shepherd", "Rottweiler", "Bulldog", "Golden Retriever", "Labrador", "Poodle"],
        },
        {
          name: "Cats & Kittens",
          types: ["Persian", "Siamese", "Maine Coon", "Bengal", "British Shorthair"],
        },
        {
          name: "Birds",
          types: ["Parrots", "Canaries", "Budgies", "Pigeons", "Other Birds"],
        },
        {
          name: "Fish",
          types: ["Aquarium Fish", "Pond Fish", "Fish Tanks & Accessories"],
        },
        {
          name: "Pet Food & Accessories",
          types: ["Dog Food", "Cat Food", "Bird Food", "Aquarium Supplies", "Pet Toys", "Pet Beds", "Pet Grooming"],
        },
      ],
    },
  ];
  
  const getTypes = (category:string, subcategory:string) => {
    // Find the category object in the jijiCategories array
    const categoryObj:any = solCatCategories.find(cat => cat.category === category);
    
    // If the category is not found, return null
    if (!categoryObj) {
      return null;
    }
  
    // Find the subcategory object within the category's subcategories array
    const subcategoryObj:any = categoryObj.subcategories.find((subcat: { name: string; }) => subcat.name === subcategory);
  
    // If the subcategory is not found, return null
    if (!subcategoryObj) {
      return null;
    }
  
    // Return the types array from the subcategory object
    return subcategoryObj.types || null;
  };
  

 const getCategory = ()=> {
  let cat:any = [];
  solCatCategories.map((i) => {
    cat.push({value:i.category, label:i.category, icon:i.icon})
  })
  return cat;
 }



 const getSubCategory = (category:string)=> {
  let cat:any = [];
  const categoryObj:any = solCatCategories.find(cat => cat.category === category);
  if (!categoryObj) {
    return null;
  }
  const subcategoryObj:any = categoryObj.subcategories
  subcategoryObj.map((i:any) => {
    cat.push({value:i.name, label:i.name})
  })
  return cat;
 }


 const getSubCatTypes = (category:string, subcategory:string) => {
  let arr:any = []
  const categoryObj:any = solCatCategories.find(cat => cat.category === category);
  if (!categoryObj) {
    return null;
  }
  const subcategoryObj:any = categoryObj.subcategories.find((subcat: { name: string; }) => subcat.name === subcategory);
  if (!subcategoryObj) {
    return null;
  }
  
  const types =  subcategoryObj.types;
  if (!types) {
    return null;
  }
   types.map((i:any) => {
    arr.push({value:i, label:i})
   })
   return arr;
};



  const DashboardMenu = [
    { 
      menu: "My Balance",
      types: [],
      icon: "fas fa-wallet", // Wallet icon
      url:"/profile/main"
    },
    { 
      menu: "Orders",
      types: [
        { name: "My Orders",  url:"/profile/orders?p=my-orders", icon: "fas fa-list" }, // List icon
        { name: "Customers Order", url:"/profile/orders?p=my-customers-order", icon: "fas fa-user-tag" } // User Tag icon
      ],
      icon: "fas fa-shopping-cart",
      url:"/profile/orders?p=my-orders" // Shopping Cart icon
    },
    { 
      menu: "Items",
      types: [
        { name: "Items For Sale", url: "/profile/Items?p=items-for-sale", icon: "fas fa-tags" }, // Tags icon
        { name: "Saved Items", url: "/profile/Items?p=saved-items", icon: "fas fa-bookmark" }, // Bookmark icon
        { name: "Post Item", url: "/profile/Items?p=post-item", icon: "fas fa-plus" } // Upload icon
      ],
      icon: "fas fa-box",
      url: "/profile/Items?p=items-for-sale" // Package icon
    },
    { 
      menu: "Call Requests",
      types: [],
      icon: "fas fa-phone",
      url: "call-requests" // Telephone Receiver icon
    },
    { 
      menu: "Messages",
      types: [],
      icon: "fas fa-envelope",
      url: "/profile/messages" // Envelope icon
    },
    { 
      menu: "Market Place",
      types: [],
      icon: "fas fa-store" ,
      url: "/"// Store icon
    }
  ];
  
  const homePageMenu = [
    { 
      menu: "From factory",
      icon: "fas fa-store" ,
      url: "/"// Store icon
    },
    { 
      menu: "New Items",
      icon: "fas fa-store" ,
      url: "/"// Store icon
    },
    { 
      menu: "Fairly Used",
      icon: "fas fa-store" ,
      url: "/"// Store icon
    }
  ]
  






















  export {
    solCatCategories,
    getCategory,
    getSubCategory,
    getTypes,
    DashboardMenu,
    getSubCatTypes,
    homePageMenu

  } ;