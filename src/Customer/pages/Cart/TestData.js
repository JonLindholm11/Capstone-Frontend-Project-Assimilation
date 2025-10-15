const products = [
  {
    product_name: "Camera",
    product_category: "electronics",
    product_description:
      "Capture life's moments in sharp detail with this DSLR camera featuring multi-focal lenses and rapid burst mode — because the perfect shot waits for no one.",
    basic_price: 899.99,
    product_img:
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg",
  },
  {
    product_name: "Headphones",
    product_category: "electronics",
    product_description:
      "Noise-canceling over-ear headphones with crisp highs and deep bass — perfect for tuning out the world or pretending you can’t hear people calling your name.",
    basic_price: 149.99,
    product_img:
      "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg",
  },
  {
    product_name: "Drone",
    product_category: "electronics",
    product_description:
      "High-performance drone with HD camera and GPS stabilization. Great for photography, exploration, or mildly concerning your neighbors.",
    basic_price: 699.99,
    product_img:
      "https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg",
  },
  {
    product_name: "Retro Landline Rotary Phone",
    product_category: "electronics",
    product_description:
      "Vintage rotary phone with that satisfying click-click dial — perfect for those who like their conversations slow and dramatic.",
    basic_price: 89.99,
    product_img:
      "https://images.pexels.com/photos/209695/pexels-photo-209695.jpeg",
  },
  {
    product_name: "Nintendude Swit",
    product_category: "electronics",
    product_description:
      "Play the latest and greatest hits like *Legend of Lunk* and *Mayrio Racing*. Portable, powerful, and slightly familiar.",
    basic_price: 349.99,
    product_img:
      "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
  },
  {
    product_name: "Fruit Desktop and Tablet Bundle",
    product_category: "electronics",
    product_description:
      "A sleek desktop and tablet set from your favorite fruit-branded company — because taking a bite out of an apple never hurt anyone.",
    basic_price: 2499.99,
    product_img:
      "https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg",
  },
  {
    product_name: "Retro Bulb TV",
    product_category: "electronics",
    product_description:
      "Bring the golden age of television into the modern day — now with 5% less radiation and 100% more nostalgia.",
    basic_price: 299.99,
    product_img:
      "https://images.pexels.com/photos/5721908/pexels-photo-5721908.jpeg",
  },
  {
    product_name: "Podcast Microphone",
    product_category: "electronics",
    product_description:
      "Professional condenser microphone with warm tones and crisp clarity — Nixon approved, but we promise, no tapes included.",
    basic_price: 129.99,
    product_img:
      "https://images.pexels.com/photos/2041381/pexels-photo-2041381.jpeg",
  },

  {
    product_name: "Gwagen 63",
    product_category: "vehicles",
    product_description: "Geländewagen is a luxury SUV made by Mercedes-Benz",
    basic_price: 199999.0,
    product_img:
      "https://images.pexels.com/photos/3457780/pexels-photo-3457780.jpeg",
  },
  {
    product_name: "Toyota Land Cruiser",
    product_category: "vehicles",
    product_description: "Durable, and highly capable four-wheel-drive SUV",
    basic_price: 87745.0,
    product_img:
      "https://images.pexels.com/photos/3879065/pexels-photo-3879065.jpeg",
  },
  {
    product_name: "lamborghini murcielago",
    product_category: "vehicles",
    product_description: "Aggressive-looking, two-seater V12 supercar",
    basic_price: 300000.0,
    product_img:
      "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg",
  },
  {
    product_name: "Porsche 911",
    product_category: "vehicles",
    product_description:
      "Iconic sports car known for its performance and design",
    basic_price: 251000.0,
    product_img:
      "https://images.pexels.com/photos/1972736/pexels-photo-1972736.jpeg",
  },
  {
    product_name: "Jeep Wrangler",
    product_category: "vehicles",
    product_description: "Iconic off-road vehicle with rugged design",
    basic_price: 102000.0,
    product_img:
      "https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg",
  },
  {
    product_name: "Audi R8",
    product_category: "vehicles",
    product_description:
      "High-performance sports car with a powerful V10 engine",
    basic_price: 161395.0,
    product_img:
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
  },
  {
    product_name: "Ford Mustang",
    product_category: "vehicles",
    product_description: "Classic American muscle car with a powerful engine",
    basic_price: 43000.0,
    product_img:
      "https://images.pexels.com/photos/1805053/pexels-photo-1805053.jpeg",
  },
  {
    product_name: "button",
    product_category: "sewing notions",
    product_description:
      "Assorted plastic sewing button, 4-hole style, smooth finish (~1.5 cm).",
    basic_price: 0.49,
    product_img:
      "https://images.pexels.com/photos/39548/sewing-needle-thread-mend-eye-of-needle-39548.jpeg",
  },
  {
    product_name: "cotton thread",
    product_category: "sewing notions",
    product_description:
      "100% cotton all-purpose sewing thread, low-lint, ideal for quilting and seams (200 yd).",
    basic_price: 2.99,
    product_img:
      "https://images.pexels.com/photos/1212179/pexels-photo-1212179.jpeg",
  },
  {
    product_name: "measuring tape",
    product_category: "sewing notions",
    product_description:
      "Soft 60 in / 150 cm tape with dual-side markings for accurate garment measuring.",
    basic_price: 3.49,
    product_img:
      "https://images.pexels.com/photos/3143085/pexels-photo-3143085.jpeg",
  },
  {
    product_name: "pin (100 ct)",
    product_category: "sewing notions",
    product_description:
      "Nickel-plated dressmaker pins, 1.5 in length, smooth shank for minimal fabric snag.",
    basic_price: 3.99,
    product_img:
      "https://images.pexels.com/photos/805920/pexels-photo-805920.jpeg",
  },
  {
    product_name: "rotary cutter",
    product_category: "sewing notions",
    product_description:
      "45 mm rotary cutter with safety lock and ergonomic grip for precise fabric cuts.",
    basic_price: 13.99,
    product_img:
      "https://images.pexels.com/photos/1409217/pexels-photo-1409217.jpeg",
  },
  {
    product_name: "sewing machine",
    product_category: "sewing notions",
    product_description:
      "Portable electric sewing machine with basic stitches, free arm, and drop-in bobbin.",
    basic_price: 99.99,
    product_img:
      "https://images.pexels.com/photos/2249290/pexels-photo-2249290.jpeg",
  },
  {
    product_name: "scissors",
    product_category: "sewing notions",
    product_description:
      "8 in dressmaker shears, stainless steel blades with comfortable offset handles.",
    basic_price: 8.49,
    product_img:
      "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg",
  },
  {
    product_name: "sewing kit",
    product_category: "sewing notions",
    product_description:
      "Compact kit with needles, mini scissors, thread cards, pins, thimble, and tape measure.",
    basic_price: 11.49,
    product_img:
      "https://images.pexels.com/photos/461035/pexels-photo-461035.jpeg",
  },
  {
    product_name: "Cordless Circular Saw",
    product_category: "construction tools",
    product_description: " A cordless battery powered Skill saw",
    basic_price: 385.27,
    product_img:
      "https://images.pexels.com/photos/30237884/pexels-photo-30237884.jpeg/",
  },
  {
    product_name: "concrete magnesium float",
    product_category: "construction tools",
    product_description:
      "a long 16' piece of metal meant to detail fresh concrete",
    basic_price: 54.98,
    product_img:
      "https://www.istockphoto.com/photo/industrial-worker-on-construction-site-laying-sealant-for-waterproofing-cement-gm535411978-94897317?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_portrait_media&utm_term=concrete%20tool",
  },
  {
    product_name: "shovel",
    product_category: "construction tools",
    product_description: "Meant to dig ",
    basic_price: 32.98,
    product_img:
      "https://www.istockphoto.com/photo/shovel-in-heap-of-dirt-gm172146091-255252?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=shovel",
  },
  {
    product_name: "skid steer ",
    product_category: "construction tools",
    product_description: " a front loading piece of equipment",
    basic_price: 44995.0,
    product_img:
      "https://www.pexels.com/photo/skid-loader-on-a-baseball-field-25559744/",
  },
  {
    product_name: "mini excavator",
    product_category: "construction tools",
    product_description: "a better shovel",
    basic_price: 25000.0,
    product_img:
      "https://www.pexels.com/photo/mini-excavator-in-melbourne-public-parking-lot-31461653/",
  },
  {
    product_name: "nail gun ",
    product_category: "construction tools",
    product_description: " a air powered nail driver ",
    basic_price: 299.11,
    product_img:
      "https://www.pexels.com/photo/drilling-hole-on-the-wall-6473980/",
  },
  {
    product_name: "hammer",
    product_category: "construction tools",
    product_description: " a metal hammer ",
    basic_price: 29.94,
    product_img:
      "https://www.pexels.com/photo/black-claw-hammer-on-brown-wooden-plank-209235/",
  },
  {
    product_name: "pizza",
    product_category: "food",
    product_description: "a circle cut into triangles",
    basic_price: 12.29,
    product_img:
      "https://www.pexels.com/photo/close-up-photo-of-person-holding-pizza-1653877/",
  },
  {
    product_name: "pasta",
    product_category: "food",
    product_description: " noodles",
    basic_price: 1.99,
    product_img:
      "https://www.pexels.com/photo/homemade-fresh-spaghetti-on-black-tray-5907896/",
  },
  {
    product_name: "tacos",
    product_category: "food",
    product_description: "meat in tortilla ",
    basic_price: 12.0,
    product_img:
      "https://www.pexels.com/photo/cooked-food-on-blue-plate-2092507/",
  },
  {
    product_name: "White Bread",
    product_category: "food",
    product_description: "White Bread is sold by the loaf",
    basic_price: 2.99,
    product_img:
      "https://images.pexels.com/photos/2942327/pexels-photo-2942327.jpeg",
  },
  {
    product_name: "Chicken breast",
    product_category: "food",
    product_description: "Chicken Breast is sold per pound",
    basic_price: 7.99,
    product_img:
      "https://images.pexels.com/photos/5769384/pexels-photo-5769384.jpeg",
  },
  {
    product_name: "Banana",
    product_category: "food",
    product_description: "Banana's price is determined per pound",
    basic_price: 3.99,
    product_img:
      "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
  },
  {
    product_name: "Strawberry",
    product_category: "food",
    product_description: "Strawberry's price is determined per pound",
    basic_price: 4.99,
    product_img:
      "https://images.pexels.com/photos/6944172/pexels-photo-6944172.jpeg",
  },
];
export default products;
