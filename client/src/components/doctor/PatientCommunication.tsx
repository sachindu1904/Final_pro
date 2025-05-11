import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Search, Send, Phone, Video, Clock, AlertCircle, User, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface PatientCommunicationProps {
  doctor: {
    name: string;
    unreadMessages: number;
  };
}

const PatientCommunication = ({ doctor }: PatientCommunicationProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('messages');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Amal Fernando",
      age: 42,
      photo: "/lovable-uploads/c0345ab3-5c66-4001-8dca-4164369fc2cf.png",
      lastMessage: "Thank you doctor, I'll follow your advice.",
      lastMessageTime: "10:23 AM",
      unread: true,
      status: "Scheduled",
      nextAppointment: "Today, 3:30 PM",
      condition: "Hypertension"
    },
    {
      id: 2,
      name: "Priya Mendis",
      age: 35,
      photo: "",
      lastMessage: "When should I take the medication?",
      lastMessageTime: "Yesterday",
      unread: true,
      status: "Follow-up",
      nextAppointment: "Aug 24, 2:00 PM",
      condition: "Diabetes Type 2"
    },
    {
      id: 3,
      name: "Malik Jayawardena",
      age: 58,
      photo: "",
      lastMessage: "I've uploaded my latest test results.",
      lastMessageTime: "Aug 18",
      unread: true,
      status: "Urgent",
      nextAppointment: "Aug 20, 9:00 AM",
      condition: "Cardiac Arrhythmia"
    },
    {
      id: 4,
      name: "Samantha Silva",
      age: 29,
      photo: "/lovable-uploads/c0345ab3-5c66-4001-8dca-4164369fc2cf.png",
      lastMessage: "The symptoms have improved since last visit.",
      lastMessageTime: "Aug 15",
      unread: false,
      status: "Completed",
      nextAppointment: "Sep 15, 11:30 AM",
      condition: "Migraine"
    }
  ];
  
  // Mock messages for a selected patient
  const messages = [
    {
      id: 1,
      sender: "patient",
      content: "Good morning doctor, I've been experiencing chest pain since yesterday evening.",
      time: "9:45 AM",
      read: true
    },
    {
      id: 2,
      sender: "doctor",
      content: "Hello Mr. Fernando. Can you describe the pain? Is it sharp or dull? Does it radiate to your arm or jaw?",
      time: "9:50 AM",
      read: true
    },
    {
      id: 3,
      sender: "patient",
      content: "It's a dull pain, mostly in the center of my chest. It doesn't radiate but gets worse when I exert myself.",
      time: "9:55 AM",
      read: true
    },
    {
      id: 4,
      sender: "doctor",
      content: "I see. Have you taken your blood pressure medication as prescribed?",
      time: "10:00 AM",
      read: true
    },
    {
      id: 5,
      sender: "patient",
      content: "Yes, I've been taking it regularly. My last reading was 145/90 this morning.",
      time: "10:05 AM",
      read: true
    },
    {
      id: 6,
      sender: "doctor",
      content: "That's a bit elevated. I'd like you to come in for an ECG. Can you visit the clinic today?",
      time: "10:10 AM",
      read: true
    },
    {
      id: 7,
      sender: "patient",
      content: "Yes, I can come in the afternoon. Would 3:30 PM work?",
      time: "10:15 AM",
      read: true
    },
    {
      id: 8,
      sender: "doctor",
      content: "That works. I'll have my assistant schedule you in. In the meantime, take rest and avoid strenuous activities.",
      time: "10:20 AM",
      read: true
    },
    {
      id: 9,
      sender: "patient",
      content: "Thank you doctor, I'll follow your advice.",
      time: "10:23 AM",
      read: false
    }
  ];
  
  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the patient",
    });
  };
  
  const handleStartCall = (type: string) => {
    toast({
      title: `Starting ${type} call`,
      description: `Initiating a ${type} call with the patient`,
    });
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Patient Communications</h1>
      
      <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
            {doctor.unreadMessages > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {doctor.unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Patient Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Patient List */}
            <Card className="md:col-span-1 overflow-hidden flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Patients</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="divide-y">
                  {filteredPatients.map(patient => (
                    <div 
                      key={patient.id} 
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${patient.id === 1 ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={patient.photo} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm truncate">{patient.name}</p>
                            <span className="text-xs text-gray-500">{patient.lastMessageTime}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{patient.lastMessage}</p>
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant={
                                patient.status === "Urgent" ? "destructive" : 
                                patient.status === "Scheduled" ? "default" :
                                patient.status === "Follow-up" ? "secondary" : "outline"
                              }
                              className="text-[10px] h-5 px-1.5"
                            >
                              {patient.status}
                            </Badge>
                            <span className="text-[10px] text-gray-500 ml-2">{patient.condition}</span>
                          </div>
                        </div>
                        {patient.unread && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Chat Area */}
            <Card className="md:col-span-2 flex flex-col overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={patients[0].photo} alt={patients[0].name} />
                      <AvatarFallback>{patients[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{patients[0].name}, {patients[0].age}</CardTitle>
                      <CardDescription className="text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Next appointment: {patients[0].nextAppointment}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600"
                      onClick={() => handleStartCall('voice')}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600"
                      onClick={() => handleStartCall('video')}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'doctor' 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs text-gray-500">{message.time}</span>
                        {message.sender === 'doctor' && (
                          <span className="text-xs text-blue-500">
                            {message.read ? 'Read' : 'Delivered'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <div className="flex w-full space-x-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[60px] flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Manage your scheduled patient appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Appointment management interface would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>Access and manage patient medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Patient records interface would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientCommunication;
