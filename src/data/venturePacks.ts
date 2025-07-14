export interface VenturePack {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  tags: string[];
  image: string;
  activities: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: string;
  bestTime: string;
  category: 'Beach' | 'Cultural' | 'Adventure' | 'Romance' | 'Food' | 'Wildlife' | 'Urban' | 'Wellness';
}

export const venturePacks: VenturePack[] = [
  {
    id: '1',
    title: 'The Diani Beach Day Escape',
    description: 'A perfect beach day with snorkeling, beachside lunch, and sunset cocktails. Experience the pristine white sands and crystal-clear waters of Kenya\'s most beautiful beach.',
    location: 'Diani Beach, Kenya',
    duration: 'Full Day',
    price: '$120',
    originalPrice: '$150',
    rating: 4.8,
    reviews: 124,
    tags: ['Beach', 'Relaxing', 'Romantic'],
    image: '🏖️',
    activities: ['Snorkeling', 'Beach Lunch', 'Sunset Drinks'],
    highlights: [
      'World-class snorkeling in coral gardens',
      'Fresh seafood lunch at Ali Barbour\'s Cave',
      'Sunset cocktails at Forty Thieves Beach Bar'
    ],
    included: [
      'Professional snorkeling guide',
      'All snorkeling equipment',
      '3-course lunch at beachfront restaurant',
      'Welcome drink and sunset cocktails',
      'Beach lounger and umbrella'
    ],
    notIncluded: [
      'Transportation to Diani Beach',
      'Additional drinks beyond package',
      'Spa services',
      'Souvenir shopping'
    ],
    difficulty: 'Easy',
    groupSize: '2-8 people',
    bestTime: 'Year-round (best: Oct-Mar)',
    category: 'Beach'
  },
  {
    id: '2',
    title: 'Mombasa Old Town Cultural Tour',
    description: 'Explore the rich Swahili heritage with guided tours, spice markets, and authentic local cuisine. Walk through centuries of history in this UNESCO World Heritage site.',
    location: 'Mombasa Old Town, Kenya',
    duration: 'Half Day',
    price: '$65',
    rating: 4.9,
    reviews: 87,
    tags: ['Cultural', 'Foodie', 'Historical'],
    image: '🏛️',
    activities: ['Guided Tour', 'Spice Market', 'Local Dinner'],
    highlights: [
      'Fort Jesus guided historical tour',
      'Traditional Swahili architecture walking tour',
      'Authentic spice market experience with tastings'
    ],
    included: [
      'Professional local guide',
      'Fort Jesus entrance fees',
      'Spice market tour with tastings',
      'Traditional Swahili dinner',
      'Cultural performance'
    ],
    notIncluded: [
      'Transportation to Old Town',
      'Personal shopping',
      'Additional meals',
      'Gratuities'
    ],
    difficulty: 'Easy',
    groupSize: '2-12 people',
    bestTime: 'Year-round (cooler mornings preferred)',
    category: 'Cultural'
  },
  {
    id: '3',
    title: 'Wasini Island Adventure',
    description: 'Dolphin watching, coral gardens snorkeling, and fresh seafood lunch on this pristine island paradise off the Kenyan coast.',
    location: 'Wasini Island, Kenya',
    duration: 'Full Day',
    price: '$95',
    rating: 4.7,
    reviews: 156,
    tags: ['Adventure', 'Nature', 'Marine Life'],
    image: '🐬',
    activities: ['Dolphin Watching', 'Snorkeling', 'Seafood Lunch'],
    highlights: [
      'Dolphin spotting in natural habitat',
      'Kisite-Mpunguti Marine Park snorkeling',
      'Fresh seafood lunch with ocean views'
    ],
    included: [
      'Boat transfer to Wasini Island',
      'Dolphin watching excursion',
      'Snorkeling equipment and guide',
      'Fresh seafood lunch',
      'Marine park fees'
    ],
    notIncluded: [
      'Transportation to departure point',
      'Drinks beyond welcome juice',
      'Underwater photography',
      'Additional water activities'
    ],
    difficulty: 'Moderate',
    groupSize: '4-16 people',
    bestTime: 'Oct-Mar (best dolphin season)',
    category: 'Adventure'
  },
  {
    id: '4',
    title: 'Nairobi Night Out',
    description: 'Rooftop dining, live music, and the best nightlife spots in the city. Experience Nairobi\'s vibrant after-dark scene like a local.',
    location: 'Nairobi, Kenya',
    duration: 'Evening',
    price: '$80',
    rating: 4.6,
    reviews: 203,
    tags: ['Nightlife', 'Music', 'Urban'],
    image: '🌃',
    activities: ['Rooftop Dinner', 'Live Music', 'Night Club'],
    highlights: [
      'Dinner at KIZA rooftop with city views',
      'Live music at The Alchemist',
      'VIP access to top nightclub'
    ],
    included: [
      'Reserved rooftop dining table',
      '3-course dinner with wine pairing',
      'Live music venue entry',
      'VIP nightclub entry with welcome drinks',
      'Professional party guide'
    ],
    notIncluded: [
      'Transportation between venues',
      'Additional drinks beyond package',
      'Late-night snacks',
      'Photography services'
    ],
    difficulty: 'Easy',
    groupSize: '2-6 people',
    bestTime: 'Year-round (weekends preferred)',
    category: 'Urban'
  },
  {
    id: '5',
    title: 'Karen Blixen Coffee Experience',
    description: 'Coffee plantation tour, giraffe center visit, and colonial mansion lunch. Step into the world of "Out of Africa" and Kenya\'s coffee heritage.',
    location: 'Karen, Nairobi',
    duration: 'Half Day',
    price: '$55',
    rating: 4.8,
    reviews: 91,
    tags: ['Coffee', 'History', 'Wildlife'],
    image: '☕',
    activities: ['Coffee Tour', 'Giraffe Center', 'Mansion Lunch'],
    highlights: [
      'Karen Blixen Museum and coffee plantation',
      'Hand-feed endangered Rothschild giraffes',
      'Colonial-style lunch at Karen Blixen Coffee Garden'
    ],
    included: [
      'Guided coffee plantation tour',
      'Coffee tasting session',
      'Giraffe Centre entrance and feeding',
      'Colonial mansion lunch',
      'Transportation between venues'
    ],
    notIncluded: [
      'Transportation to Karen area',
      'Coffee beans purchase',
      'Additional wildlife park visits',
      'Souvenir shopping'
    ],
    difficulty: 'Easy',
    groupSize: '2-10 people',
    bestTime: 'Year-round (mornings preferred)',
    category: 'Cultural'
  },
  {
    id: '6',
    title: 'Lake Nakuru Safari Day Trip',
    description: 'Pink flamingos, rhino spotting, and picnic lunch in the national park. One of Kenya\'s most spectacular wildlife experiences.',
    location: 'Lake Nakuru, Kenya',
    duration: 'Full Day',
    price: '$140',
    originalPrice: '$180',
    rating: 4.9,
    reviews: 78,
    tags: ['Safari', 'Wildlife', 'Nature'],
    image: '🦩',
    activities: ['Game Drive', 'Flamingo Watching', 'Picnic Lunch'],
    highlights: [
      'Millions of pink flamingos on the lake',
      'Black and white rhino spotting',
      'Scenic picnic lunch with park views'
    ],
    included: [
      'Professional safari guide and 4WD vehicle',
      'Lake Nakuru National Park fees',
      'Game drive with wildlife spotting',
      'Picnic lunch in the park',
      'Binoculars and park maps'
    ],
    notIncluded: [
      'Transportation from Nairobi',
      'Additional meals',
      'Professional photography',
      'Souvenir purchases'
    ],
    difficulty: 'Easy',
    groupSize: '2-6 people',
    bestTime: 'Jun-Oct (dry season)',
    category: 'Wildlife'
  },
  {
    id: '7',
    title: 'Romantic Lamu Getaway',
    description: 'Traditional dhow sailing, sunset dinner, and beachfront accommodation on this UNESCO World Heritage island.',
    location: 'Lamu Island, Kenya',
    duration: '2 Days',
    price: '$280',
    rating: 4.9,
    reviews: 45,
    tags: ['Romance', 'Island', 'Heritage'],
    image: '⛵',
    activities: ['Dhow Sailing', 'Sunset Dinner', 'Beach Walk'],
    highlights: [
      'Traditional dhow sunset sailing',
      'Romantic beachfront dinner',
      'Lamu Old Town cultural exploration'
    ],
    included: [
      'Beachfront accommodation (1 night)',
      'Traditional dhow sailing experience',
      'Romantic dinner with local cuisine',
      'Lamu Old Town guided tour',
      'Airport transfers'
    ],
    notIncluded: [
      'Flights to Lamu',
      'Additional meals',
      'Spa services',
      'Water sports equipment'
    ],
    difficulty: 'Easy',
    groupSize: '2-4 people',
    bestTime: 'Oct-Mar (best weather)',
    category: 'Romance'
  },
  {
    id: '8',
    title: 'Mount Kenya Hiking Adventure',
    description: 'Multi-day hiking experience on Africa\'s second-highest peak with stunning alpine scenery and diverse wildlife.',
    location: 'Mount Kenya National Park',
    duration: '3 Days',
    price: '$320',
    rating: 4.7,
    reviews: 67,
    tags: ['Hiking', 'Mountain', 'Challenge'],
    image: '🏔️',
    activities: ['Mountain Hiking', 'Wildlife Spotting', 'Alpine Lakes'],
    highlights: [
      'Sirimon route hiking experience',
      'Alpine lakes and unique vegetation',
      'Possible wildlife sightings including buffalo and elephants'
    ],
    included: [
      'Professional mountain guide',
      'Mountain huts accommodation',
      'All meals during trek',
      'Park entrance fees',
      'Hiking equipment rental'
    ],
    notIncluded: [
      'Transportation to trailhead',
      'Personal hiking gear',
      'Travel insurance',
      'Porter services'
    ],
    difficulty: 'Challenging',
    groupSize: '2-8 people',
    bestTime: 'Jan-Feb, Jun-Oct (dry seasons)',
    category: 'Adventure'
  },
  {
    id: '9',
    title: 'Maasai Mara Luxury Safari',
    description: 'Premium safari experience with luxury tented camp, professional guide, and exclusive game drives in Kenya\'s most famous reserve.',
    location: 'Maasai Mara, Kenya',
    duration: '3 Days',
    price: '$450',
    originalPrice: '$550',
    rating: 4.9,
    reviews: 134,
    tags: ['Safari', 'Luxury', 'Wildlife'],
    image: '🦁',
    activities: ['Game Drives', 'Cultural Visit', 'Bush Dinner'],
    highlights: [
      'Big Five wildlife spotting',
      'Great Migration (seasonal)',
      'Maasai village cultural experience'
    ],
    included: [
      'Luxury tented camp accommodation',
      'All meals and premium beverages',
      'Professional safari guide and 4WD',
      'Game drives twice daily',
      'Maasai village visit'
    ],
    notIncluded: [
      'Flights to Maasai Mara',
      'Travel insurance',
      'Laundry services',
      'Personal expenses'
    ],
    difficulty: 'Easy',
    groupSize: '2-6 people',
    bestTime: 'Jul-Oct (Great Migration)',
    category: 'Wildlife'
  },
  {
    id: '10',
    title: 'Kenyan Foodie Adventure',
    description: 'Culinary journey through Nairobi\'s best restaurants, street food markets, and cooking classes with local chefs.',
    location: 'Nairobi, Kenya',
    duration: 'Full Day',
    price: '$85',
    rating: 4.6,
    reviews: 98,
    tags: ['Food', 'Culture', 'Local'],
    image: '🍽️',
    activities: ['Restaurant Tour', 'Cooking Class', 'Market Visit'],
    highlights: [
      'Authentic Kenyan cooking class',
      'Street food tour in city markets',
      'Fine dining at top Nairobi restaurants'
    ],
    included: [
      'Professional food guide',
      'Cooking class with local chef',
      'Street food tastings',
      'Restaurant lunch and dinner',
      'Recipe booklet'
    ],
    notIncluded: [
      'Transportation between venues',
      'Alcoholic beverages',
      'Additional snacks',
      'Cooking equipment purchase'
    ],
    difficulty: 'Easy',
    groupSize: '2-8 people',
    bestTime: 'Year-round',
    category: 'Food'
  },
  {
    id: '11',
    title: 'Spa & Wellness Retreat',
    description: 'Rejuvenating spa treatments, yoga sessions, and healthy cuisine in a tranquil setting outside Nairobi.',
    location: 'Kiambu, Kenya',
    duration: 'Full Day',
    price: '$110',
    rating: 4.8,
    reviews: 76,
    tags: ['Wellness', 'Spa', 'Relaxation'],
    image: '🧘',
    activities: ['Spa Treatments', 'Yoga Class', 'Healthy Dining'],
    highlights: [
      'Full-body massage and facial treatments',
      'Guided yoga and meditation session',
      'Organic farm-to-table dining'
    ],
    included: [
      'Full spa treatment package',
      'Yoga and meditation class',
      'Healthy lunch and refreshments',
      'Wellness consultation',
      'Transportation from Nairobi'
    ],
    notIncluded: [
      'Additional spa treatments',
      'Personal wellness products',
      'Extended accommodation',
      'Private yoga sessions'
    ],
    difficulty: 'Easy',
    groupSize: '2-12 people',
    bestTime: 'Year-round',
    category: 'Wellness'
  },
  {
    id: '12',
    title: 'Hell\'s Gate Cycling Adventure',
    description: 'Cycle through dramatic landscapes, spot wildlife, and enjoy natural hot springs in this unique national park.',
    location: 'Hell\'s Gate National Park',
    duration: 'Full Day',
    price: '$70',
    rating: 4.5,
    reviews: 89,
    tags: ['Cycling', 'Adventure', 'Nature'],
    image: '🚴',
    activities: ['Cycling', 'Rock Climbing', 'Hot Springs'],
    highlights: [
      'Cycling among giraffes and zebras',
      'Hell\'s Gate Gorge exploration',
      'Natural hot springs relaxation'
    ],
    included: [
      'Mountain bike rental',
      'Professional cycling guide',
      'Park entrance fees',
      'Hell\'s Gate Gorge walking tour',
      'Hot springs visit'
    ],
    notIncluded: [
      'Transportation to park',
      'Meals and refreshments',
      'Rock climbing equipment',
      'Photography services'
    ],
    difficulty: 'Moderate',
    groupSize: '2-10 people',
    bestTime: 'Jun-Oct (dry season)',
    category: 'Adventure'
  }
];