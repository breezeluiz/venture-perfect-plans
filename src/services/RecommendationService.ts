interface UserPreferences {
  occasionTypes: string[];
  budgetRange: string;
  vibes: string[];
  locations: string[];
  activities: string[];
  pastBookings: string[];
  ratings: { [ventureId: string]: number };
}

interface VentureData {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  tags: string[];
  activities: string[];
  popularity: number;
  seasonality: string[];
}

export class RecommendationService {
  // Fisher-Yates shuffle algorithm for randomizing recommendations
  private static fisherYatesShuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Collaborative filtering algorithm
  private static calculateSimilarity(user1: UserPreferences, user2: UserPreferences): number {
    const intersection = user1.vibes.filter(vibe => user2.vibes.includes(vibe)).length;
    const union = new Set([...user1.vibes, ...user2.vibes]).size;
    
    if (union === 0) return 0;
    return intersection / union;
  }

  // Content-based filtering
  private static calculateContentScore(venture: VentureData, preferences: UserPreferences): number {
    let score = 0;

    // Vibe matching (40% weight)
    const vibeMatches = venture.tags.filter(tag => preferences.vibes.includes(tag)).length;
    score += (vibeMatches / Math.max(venture.tags.length, 1)) * 40;

    // Location preference (20% weight)
    if (preferences.locations.includes(venture.location)) {
      score += 20;
    }

    // Budget compatibility (20% weight)
    const budgetScore = this.calculateBudgetScore(venture.price, preferences.budgetRange);
    score += budgetScore * 20;

    // Rating weight (10% weight)
    score += (venture.rating / 5) * 10;

    // Popularity weight (10% weight)
    score += (venture.popularity / 100) * 10;

    return score;
  }

  private static calculateBudgetScore(price: number, budgetRange: string): number {
    const ranges = {
      'budget': { min: 0, max: 100 },
      'mid-range': { min: 50, max: 300 },
      'luxury': { min: 200, max: 1000 },
      'ultra-luxury': { min: 500, max: 5000 }
    };

    const range = ranges[budgetRange as keyof typeof ranges];
    if (!range) return 0.5;

    if (price >= range.min && price <= range.max) return 1;
    if (price < range.min) return Math.max(0, 1 - (range.min - price) / range.min);
    return Math.max(0, 1 - (price - range.max) / range.max);
  }

  // Main recommendation engine
  static generateRecommendations(
    ventures: VentureData[], 
    userPreferences: UserPreferences,
    allUsers: UserPreferences[] = [],
    count: number = 10
  ): VentureData[] {
    // Content-based scoring
    const scoredVentures = ventures.map(venture => ({
      ...venture,
      contentScore: this.calculateContentScore(venture, userPreferences)
    }));

    // Collaborative filtering (if we have other users' data)
    if (allUsers.length > 0) {
      const similarUsers = allUsers
        .map(user => ({
          user,
          similarity: this.calculateSimilarity(userPreferences, user)
        }))
        .filter(item => item.similarity > 0.3)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      // Adjust scores based on similar users' preferences
      scoredVentures.forEach(venture => {
        let collaborativeBoost = 0;
        similarUsers.forEach(({ user, similarity }) => {
          if (user.pastBookings.includes(venture.id) && user.ratings[venture.id] >= 4) {
            collaborativeBoost += similarity * 10;
          }
        });
        venture.contentScore += collaborativeBoost;
      });
    }

    // Sort by combined score and apply Fisher-Yates shuffle to top candidates
    const topCandidates = scoredVentures
      .sort((a, b) => b.contentScore - a.contentScore)
      .slice(0, count * 2); // Get more candidates than needed

    // Apply Fisher-Yates shuffle to add serendipity
    const shuffledCandidates = this.fisherYatesShuffle(topCandidates);
    
    // Return top recommendations with some randomness
    return shuffledCandidates.slice(0, count);
  }

  // Diversity algorithm to ensure varied recommendations
  static diversifyRecommendations(recommendations: VentureData[]): VentureData[] {
    const diversified: VentureData[] = [];
    const usedCategories = new Set<string>();
    const usedLocations = new Set<string>();

    // First pass: ensure category diversity
    recommendations.forEach(venture => {
      if (diversified.length < 3 || 
          (!usedCategories.has(venture.category) && diversified.length < 7) ||
          (!usedLocations.has(venture.location) && diversified.length < 10)) {
        diversified.push(venture);
        usedCategories.add(venture.category);
        usedLocations.add(venture.location);
      }
    });

    // Fill remaining slots with highest scoring items
    const remaining = recommendations.filter(v => !diversified.includes(v));
    diversified.push(...remaining.slice(0, Math.max(0, 10 - diversified.length)));

    return diversified;
  }

  // Trending algorithm based on recent bookings and ratings
  static getTrendingVentures(ventures: VentureData[], recentBookings: string[]): VentureData[] {
    const trendingScores = new Map<string, number>();

    ventures.forEach(venture => {
      let score = venture.rating * venture.popularity;
      
      // Boost score based on recent bookings
      const recentBookingCount = recentBookings.filter(id => id === venture.id).length;
      score += recentBookingCount * 10;

      trendingScores.set(venture.id, score);
    });

    return ventures
      .sort((a, b) => (trendingScores.get(b.id) || 0) - (trendingScores.get(a.id) || 0))
      .slice(0, 6);
  }
}