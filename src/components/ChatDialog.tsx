import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Phone, Video, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatDialogProps {
  guideName: string;
  guideImage?: string;
  bookingId: string;
  triggerButton?: React.ReactNode;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'guide';
  timestamp: Date;
}

export function ChatDialog({ guideName, guideImage, bookingId, triggerButton }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm ${guideName}, your guide for this adventure. I'm here to help make your experience unforgettable. Feel free to ask me anything about your upcoming trip!`,
      sender: 'guide',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate guide response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you shortly with the details.",
        "Great question! Let me check that for you and respond in a few minutes.",
        "I'm excited to help you with this! Give me a moment to gather the information.",
        "Perfect! I'll make sure everything is arranged exactly as you requested.",
        "Absolutely! I'll coordinate with the local team and confirm the arrangements."
      ];
      
      const guideResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'guide',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, guideResponse]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCall = () => {
    toast({
      title: "Calling guide...",
      description: "This feature will be available soon. For now, please continue chatting.",
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video call",
      description: "Video calling will be available soon. Please use text chat for now.",
    });
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="hover-scale">
      <MessageCircle className="h-4 w-4 mr-2" />
      Chat with Guide
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={guideImage} alt={guideName} />
                <AvatarFallback className="bg-venture-coral text-white">
                  {guideName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{guideName}</div>
                <div className="text-xs text-muted-foreground">Your Adventure Guide</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCall}>
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleVideoCall}>
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-1 p-4 border rounded-md bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-venture-coral text-white'
                        : 'bg-card border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center mt-2">
          Booking Reference: {bookingId}
        </div>
      </DialogContent>
    </Dialog>
  );
}