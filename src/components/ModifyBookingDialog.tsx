import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, Clock, Edit3, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ModifyBookingDialogProps {
  bookingId: string;
  currentDate: string;
  currentParticipants: number;
  ventureTitle: string;
  triggerButton?: React.ReactNode;
}

export function ModifyBookingDialog({ 
  bookingId, 
  currentDate, 
  currentParticipants, 
  ventureTitle, 
  triggerButton 
}: ModifyBookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentDate));
  const [participants, setParticipants] = useState(currentParticipants.toString());
  const [specialRequests, setSpecialRequests] = useState('');
  const [modificationType, setModificationType] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!modificationType) {
      toast({
        title: "Please select modification type",
        description: "Choose what you'd like to modify about your booking.",
        variant: "destructive",
      });
      return;
    }

    // Simulate modification request
    toast({
      title: "Modification request submitted!",
      description: "We'll review your request and get back to you within 24 hours.",
    });

    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="hover-scale">
      <Edit3 className="h-4 w-4 mr-2" />
      Modify Booking
    </Button>
  );

  const modificationFees = {
    'date': 'Free (up to 48 hours before)',
    'participants': 'Free (subject to availability)',
    'upgrade': 'Additional cost may apply',
    'special': 'No additional cost',
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-venture-coral" />
            Modify Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Booking Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{ventureTitle}</CardTitle>
              <CardDescription>Booking Reference: {bookingId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>Current Date: {format(new Date(currentDate), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>Current Participants: {currentParticipants}</span>
              </div>
            </CardContent>
          </Card>

          {/* Modification Type */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">What would you like to modify?</Label>
            <Select value={modificationType} onValueChange={setModificationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select modification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Change Date</SelectItem>
                <SelectItem value="participants">Change Number of Participants</SelectItem>
                <SelectItem value="upgrade">Upgrade Package</SelectItem>
                <SelectItem value="special">Add Special Requests</SelectItem>
              </SelectContent>
            </Select>
            
            {modificationType && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Fee: {modificationFees[modificationType as keyof typeof modificationFees]}</span>
              </div>
            )}
          </div>

          {/* Date Selection */}
          {modificationType === 'date' && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select New Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Participants */}
          {modificationType === 'participants' && (
            <div className="space-y-3">
              <Label htmlFor="participants" className="text-base font-semibold">
                Number of Participants
              </Label>
              <Input
                id="participants"
                type="number"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                min="1"
                max="20"
                className="w-full"
              />
            </div>
          )}

          {/* Package Upgrade */}
          {modificationType === 'upgrade' && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Available Upgrades</Label>
              <div className="space-y-2">
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Premium Package</div>
                      <div className="text-sm text-muted-foreground">
                        Includes luxury transport & premium meals
                      </div>
                    </div>
                    <Badge variant="outline">+$200</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">VIP Experience</div>
                      <div className="text-sm text-muted-foreground">
                        Private guide & exclusive access
                      </div>
                    </div>
                    <Badge variant="outline">+$450</Badge>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Special Requests */}
          {(modificationType === 'special' || modificationType) && (
            <div className="space-y-3">
              <Label htmlFor="special-requests" className="text-base font-semibold">
                Special Requests or Additional Notes
              </Label>
              <Textarea
                id="special-requests"
                placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or other requests..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          {/* Important Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-amber-800">Important Notice</div>
                  <div className="text-amber-700">
                    Modification requests are subject to availability. Date changes must be made at least 48 hours in advance to avoid cancellation fees.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-venture-coral hover:bg-venture-coral/90"
              disabled={!modificationType}
            >
              Submit Modification Request
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}