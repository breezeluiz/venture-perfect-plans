interface VenueData {
  name: string;
  location: string;
  category: string;
  description: string;
  rating: number;
  priceRange: string;
  activities: string[];
  image: string;
  coordinates?: { lat: number; lng: number };
}

export class KenyaVenuesService {
  private static readonly KENYA_TOURISM_SOURCES = [
    'https://magicalkenya.com',
    'https://kenyacoastbeach.com',
    'https://maasaimara.com',
    'https://amboselipark.com'
  ];

  // Simulated web scraping data (in production, this would fetch from actual APIs)
  private static readonly SCRAPED_VENUES: VenueData[] = [
    {
      name: "Giraffe Centre",
      location: "Nairobi, Kenya",
      category: "Wildlife",
      description: "Get up close with endangered Rothschild giraffes in this conservation center",
      rating: 4.8,
      priceRange: "$15-25",
      activities: ["Giraffe feeding", "Educational tour", "Photography"],
      image: "🦒",
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    {
      name: "Karura Forest",
      location: "Nairobi, Kenya", 
      category: "Nature",
      description: "Urban forest with hiking trails, waterfalls, and caves",
      rating: 4.6,
      priceRange: "Free",
      activities: ["Hiking", "Bird watching", "Cycling", "Picnicking"],
      image: "🌲",
      coordinates: { lat: -1.2500, lng: 36.8333 }
    },
    {
      name: "Hell's Gate National Park",
      location: "Naivasha, Kenya",
      category: "Adventure",
      description: "Unique park where you can walk and cycle among wildlife",
      rating: 4.7,
      priceRange: "$25-40",
      activities: ["Game viewing", "Rock climbing", "Cycling", "Hot springs"],
      image: "🏔️",
      coordinates: { lat: -0.9667, lng: 36.3167 }
    },
    {
      name: "Lamu Old Town",
      location: "Lamu Island, Kenya",
      category: "Cultural",
      description: "UNESCO World Heritage Site with Swahili architecture",
      rating: 4.9,
      priceRange: "$30-80",
      activities: ["Cultural tour", "Dhow sailing", "Sunset cruise", "Market visit"],
      image: "🏛️",
      coordinates: { lat: -2.2721, lng: 40.9020 }
    },
    {
      name: "Diani Beach",
      location: "Kwale, Kenya",
      category: "Beach",
      description: "Pristine white sand beach with coral reefs",
      rating: 4.8,
      priceRange: "$20-150",
      activities: ["Snorkeling", "Diving", "Kite surfing", "Dolphin watching"],
      image: "🏖️",
      coordinates: { lat: -4.3167, lng: 39.5833 }
    },
    {
      name: "Lake Nakuru National Park",
      location: "Nakuru, Kenya",
      category: "Wildlife",
      description: "Famous for flamingos and rhino sanctuary",
      rating: 4.5,
      priceRange: "$60-120",
      activities: ["Game drive", "Bird watching", "Photography", "Rhino tracking"],
      image: "🦩",
      coordinates: { lat: -0.3667, lng: 36.0833 }
    },
    {
      name: "Mount Kenya National Park",
      location: "Central Kenya",
      category: "Adventure",
      description: "Africa's second highest peak with diverse ecosystems",
      rating: 4.7,
      priceRange: "$40-200",
      activities: ["Mountain climbing", "Hiking", "Wildlife viewing", "Photography"],
      image: "⛰️",
      coordinates: { lat: -0.1667, lng: 37.3000 }
    },
    {
      name: "Maasai Mara National Reserve",
      location: "Narok, Kenya",
      category: "Safari",
      description: "World-famous for the Great Migration and Big Five",
      rating: 4.9,
      priceRange: "$200-800",
      activities: ["Game drive", "Hot air balloon", "Cultural visit", "Wildlife photography"],
      image: "🦁",
      coordinates: { lat: -1.4167, lng: 35.0000 }
    },
    {
      name: "Amboseli National Park",
      location: "Kajiado, Kenya",
      category: "Safari",
      description: "Best views of Mount Kilimanjaro and large elephant herds",
      rating: 4.6,
      priceRange: "$80-300",
      activities: ["Elephant watching", "Photography", "Cultural visit", "Nature walk"],
      image: "🐘",
      coordinates: { lat: -2.6500, lng: 37.2833 }
    },
    {
      name: "Watamu Marine National Park",
      location: "Kilifi, Kenya",
      category: "Marine",
      description: "Protected coral reefs and marine life sanctuary",
      rating: 4.7,
      priceRange: "$30-100",
      activities: ["Snorkeling", "Glass bottom boat", "Turtle watching", "Fishing"],
      image: "🐠",
      coordinates: { lat: -3.3167, lng: 40.0167 }
    },
    {
      name: "Ol Pejeta Conservancy",
      location: "Laikipia, Kenya",
      category: "Conservation",
      description: "Private conservancy with last northern white rhinos",
      rating: 4.8,
      priceRange: "$100-400",
      activities: ["Rhino tracking", "Chimpanzee sanctuary", "Night game drive", "Conservation tour"],
      image: "🦏",
      coordinates: { lat: 0.0000, lng: 36.9000 }
    },
    {
      name: "Tsavo National Parks",
      location: "Eastern Kenya",
      category: "Safari",
      description: "Kenya's largest national park with red elephants",
      rating: 4.4,
      priceRange: "$60-250",
      activities: ["Game drive", "Bird watching", "Photography", "Camping"],
      image: "🌅",
      coordinates: { lat: -2.5000, lng: 38.5000 }
    }
  ];

  // Simulated web scraping function
  static async scrapeKenyaVenues(): Promise<VenueData[]> {
    try {
      // In a real implementation, this would use web scraping APIs like Puppeteer or Playwright
      console.log('Scraping Kenya venues from multiple sources...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return scraped data with some randomization
      const shuffledVenues = this.shuffleArray([...this.SCRAPED_VENUES]);
      
      console.log(`Successfully scraped ${shuffledVenues.length} venues from Kenya tourism sources`);
      return shuffledVenues;
    } catch (error) {
      console.error('Error scraping venues:', error);
      return this.SCRAPED_VENUES; // Fallback to static data
    }
  }

  // Get venues by category
  static getVenuesByCategory(category: string): VenueData[] {
    return this.SCRAPED_VENUES.filter(venue => 
      venue.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get venues by location/region
  static getVenuesByRegion(region: string): VenueData[] {
    return this.SCRAPED_VENUES.filter(venue => 
      venue.location.toLowerCase().includes(region.toLowerCase())
    );
  }

  // Search venues by keywords
  static searchVenues(query: string): VenueData[] {
    const lowerQuery = query.toLowerCase();
    return this.SCRAPED_VENUES.filter(venue => 
      venue.name.toLowerCase().includes(lowerQuery) ||
      venue.description.toLowerCase().includes(lowerQuery) ||
      venue.activities.some(activity => activity.toLowerCase().includes(lowerQuery))
    );
  }

  // Get top-rated venues
  static getTopRatedVenues(limit: number = 10): VenueData[] {
    return [...this.SCRAPED_VENUES]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  // Get venues by price range
  static getVenuesByPrice(maxPrice: number): VenueData[] {
    return this.SCRAPED_VENUES.filter(venue => {
      // Extract max price from price range string
      const priceMatch = venue.priceRange.match(/\$(\d+)/g);
      if (!priceMatch) return venue.priceRange.toLowerCase() === 'free';
      
      const prices = priceMatch.map(p => parseInt(p.replace('$', '')));
      const maxVenuePrice = Math.max(...prices);
      
      return maxVenuePrice <= maxPrice;
    });
  }

  // Enhanced scraping simulation with real-time data updates
  static async updateVenueDatabase(): Promise<{
    newVenues: number;
    updatedVenues: number;
    totalVenues: number;
  }> {
    console.log('Updating Kenya venues database...');
    
    // Simulate fetching from multiple tourism websites
    const sources = [
      'Kenya Tourism Board API',
      'Magical Kenya Website',
      'TripAdvisor Kenya',
      'Kenya Wildlife Service',
      'Local Tour Operators'
    ];

    let newVenues = 0;
    let updatedVenues = 0;

    for (const source of sources) {
      console.log(`Fetching data from ${source}...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate finding new venues and updates
      newVenues += Math.floor(Math.random() * 3);
      updatedVenues += Math.floor(Math.random() * 5);
    }

    return {
      newVenues,
      updatedVenues,
      totalVenues: this.SCRAPED_VENUES.length + newVenues
    };
  }

  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get venues suitable for specific occasions
  static getVenuesForOccasion(occasion: string): VenueData[] {
    const occasionMap: { [key: string]: string[] } = {
      'romantic': ['Beach', 'Cultural', 'Safari'],
      'adventure': ['Adventure', 'Safari', 'Wildlife'],
      'family': ['Wildlife', 'Nature', 'Beach'],
      'honeymoon': ['Beach', 'Safari', 'Cultural'],
      'anniversary': ['Cultural', 'Beach', 'Conservation']
    };

    const relevantCategories = occasionMap[occasion.toLowerCase()] || [];
    
    return this.SCRAPED_VENUES.filter(venue => 
      relevantCategories.includes(venue.category)
    ).sort((a, b) => b.rating - a.rating);
  }
}