import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, MapPin, Calendar, DollarSign, Heart } from "lucide-react";

interface PlanBuilderProps {
  onComplete: (planData: any) => void;
}

export function PlanBuilder({ onComplete }: PlanBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState({
    occasion: "",
    who: "",
    location: "",
    date: "",
    time: "",
    vibes: [] as string[],
    interests: [] as string[],
    budget: "",
    dietary: [] as string[],
    accessibility: [] as string[],
    transportation: "",
  });

  const vibeOptions = [
    "Romantic", "Adventurous", "Relaxing", "Foodie", 
    "Intellectual & Artsy", "Lively & Fun", "Low-key & Casual"
  ];

  const interestOptions = [
    "Live Music", "Fine Dining", "Nature & Outdoors", "Museums & Galleries",
    "Craft Drinks", "Dancing", "Spa & Wellness", "Cooking Class", "Beach Activities"
  ];

  const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "Halal", "Kosher"];
  const accessibilityOptions = ["Wheelchair Accessible", "Hearing Accessible", "Vision Accessible"];

  const handleVibeToggle = (vibe: string) => {
    setPlanData(prev => ({
      ...prev,
      vibes: prev.vibes.includes(vibe) 
        ? prev.vibes.filter(v => v !== vibe)
        : prev.vibes.length < 3 ? [...prev.vibes, vibe] : prev.vibes
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setPlanData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    onComplete(planData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-venture-coral" />
              <h2 className="text-2xl font-bold mb-2">Let's Start with the Basics</h2>
              <p className="text-muted-foreground">Tell us about your upcoming adventure</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="occasion">What's the occasion?</Label>
                <Select value={planData.occasion} onValueChange={(value) => setPlanData(prev => ({ ...prev, occasion: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-date">First Date</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="spontaneous">Spontaneous Night Out</SelectItem>
                    <SelectItem value="weekend-getaway">Weekend Getaway</SelectItem>
                    <SelectItem value="just-because">Just Because</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="who">Who is this for?</Label>
                <Select value={planData.who} onValueChange={(value) => setPlanData(prev => ({ ...prev, who: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select who this is for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me-partner">Me & My Partner</SelectItem>
                    <SelectItem value="friend">A Friend</SelectItem>
                    <SelectItem value="group">A Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Mombasa, Kenya"
                  value={planData.location}
                  onChange={(e) => setPlanData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={planData.date}
                    onChange={(e) => setPlanData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={planData.time} onValueChange={(value) => setPlanData(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="full-day">Full Day</SelectItem>
                      <SelectItem value="weekend">Weekend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 mx-auto mb-4 text-venture-coral" />
              <h2 className="text-2xl font-bold mb-2">What's Your Vibe?</h2>
              <p className="text-muted-foreground">Select up to 3 moods that match your desired experience</p>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Choose your vibes (max 3):</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vibeOptions.map((vibe) => (
                  <Badge
                    key={vibe}
                    variant={planData.vibes.includes(vibe) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center transition-all duration-200 ${
                      planData.vibes.includes(vibe) 
                        ? "bg-venture-coral hover:bg-venture-coral/90" 
                        : "hover:bg-venture-cream"
                    }`}
                    onClick={() => handleVibeToggle(vibe)}
                  >
                    {vibe}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">What are your interests?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={planData.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center transition-all duration-200 ${
                      planData.interests.includes(interest)
                        ? "bg-venture-ocean hover:bg-venture-ocean/90 text-white"
                        : "hover:bg-venture-cream"
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-venture-coral" />
              <h2 className="text-2xl font-bold mb-2">What's Your Budget?</h2>
              <p className="text-muted-foreground">Total estimated cost for 2 people</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    planData.budget === "affordable" 
                      ? "border-venture-coral bg-venture-cream" 
                      : "border-border hover:border-venture-coral/50"
                  }`}
                  onClick={() => setPlanData(prev => ({ ...prev, budget: "affordable" }))}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">$ Affordable & Charming</h3>
                      <p className="text-muted-foreground">Under $50 / 6,500 KSh</p>
                    </div>
                    <div className="text-2xl">💝</div>
                  </div>
                </div>

                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    planData.budget === "special" 
                      ? "border-venture-coral bg-venture-cream" 
                      : "border-border hover:border-venture-coral/50"
                  }`}
                  onClick={() => setPlanData(prev => ({ ...prev, budget: "special" }))}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">$$ A Special Treat</h3>
                      <p className="text-muted-foreground">$50 - $150 / 6,500 - 19,500 KSh</p>
                    </div>
                    <div className="text-2xl">🌟</div>
                  </div>
                </div>

                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    planData.budget === "luxurious" 
                      ? "border-venture-coral bg-venture-cream" 
                      : "border-border hover:border-venture-coral/50"
                  }`}
                  onClick={() => setPlanData(prev => ({ ...prev, budget: "luxurious" }))}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">$$$ Indulgent & Luxurious</h3>
                      <p className="text-muted-foreground">$150+ / 19,500+ KSh</p>
                    </div>
                    <div className="text-2xl">💎</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-venture-coral" />
              <h2 className="text-2xl font-bold mb-2">Any Special Needs?</h2>
              <p className="text-muted-foreground">Help us make your experience perfect</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Dietary Requirements:</Label>
                <div className="space-y-2">
                  {dietaryOptions.map((dietary) => (
                    <div key={dietary} className="flex items-center space-x-2">
                      <Checkbox 
                        id={dietary}
                        checked={planData.dietary.includes(dietary)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPlanData(prev => ({ ...prev, dietary: [...prev.dietary, dietary] }));
                          } else {
                            setPlanData(prev => ({ ...prev, dietary: prev.dietary.filter(d => d !== dietary) }));
                          }
                        }}
                      />
                      <Label htmlFor={dietary}>{dietary}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Accessibility Needs:</Label>
                <div className="space-y-2">
                  {accessibilityOptions.map((accessibility) => (
                    <div key={accessibility} className="flex items-center space-x-2">
                      <Checkbox 
                        id={accessibility}
                        checked={planData.accessibility.includes(accessibility)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPlanData(prev => ({ ...prev, accessibility: [...prev.accessibility, accessibility] }));
                          } else {
                            setPlanData(prev => ({ ...prev, accessibility: prev.accessibility.filter(a => a !== accessibility) }));
                          }
                        }}
                      />
                      <Label htmlFor={accessibility}>{accessibility}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="transportation">Transportation Preference:</Label>
                <Select value={planData.transportation} onValueChange={(value) => setPlanData(prev => ({ ...prev, transportation: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking Only</SelectItem>
                    <SelectItem value="public">Public Transport Friendly</SelectItem>
                    <SelectItem value="driving">Requires Driving</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-venture-coral">Plan Builder</CardTitle>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? "bg-venture-coral" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <CardDescription>Step {currentStep} of 4</CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-venture-coral hover:bg-venture-coral/90">
              Create My Venture <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}