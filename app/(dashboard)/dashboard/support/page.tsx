"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
  admin_response?: string;
}

export default function SupportPage() {
  const { userId } = useAuth();
  const { user } = useUser();

  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  });

  const fetchTickets = useCallback(async () => {
    try {
      const response = await fetch('/api/support');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch support tickets');
      }

      setTickets(result.tickets || []);

    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (userId) {
      fetchTickets();
    }
  }, [userId, fetchTickets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !user?.primaryEmailAddress?.emailAddress) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          user_email: user.primaryEmailAddress.emailAddress,
          user_name: user.fullName || user.firstName || "User",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create support ticket');
      }

      const ticket = result.ticket;

      // Send notification emails
      try {
        await fetch('/api/support/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketId: ticket.id,
            subject: formData.subject,
            description: formData.description,
            userEmail: user.primaryEmailAddress.emailAddress,
            userName: user.fullName || user.firstName || "User",
            category: formData.category,
            priority: formData.priority,
          }),
        });
      } catch (notifyError) {
        console.error('Failed to send notifications:', notifyError);
        // Don't fail the ticket creation if notification fails
      }

      toast({
        title: "Success",
        description: "Support ticket created successfully. We'll get back to you soon!",
      });

      setFormData({
        subject: "",
        description: "",
        category: "general",
        priority: "medium",
      });
      setShowCreateForm(false);
      fetchTickets();
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast({
        title: "Error",
        description: "Failed to create support ticket",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCustomerResponse = async (ticketId: string) => {
    if (!responseText.trim()) return;

    setResponding(true);
    try {
      const response = await fetch(`/api/support/${ticketId}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: responseText,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send response');
      }

      toast({
        title: "Response Sent",
        description: "Your response has been sent to support.",
      });

      setResponseText("");
      setSelectedTicket(null);
      fetchTickets();
    } catch (error) {
      console.error("Error sending response:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send response",
        variant: "destructive",
      });
    } finally {
      setResponding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
      case "closed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "waiting_response":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading support tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-gray-600">Get help with your PassItOn account</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="bug_report">Bug Report</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide as much detail as possible about your issue..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Ticket"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Support Tickets</h2>
        
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Support Tickets</h3>
              <p className="text-gray-600 mb-4">
                You haven&apos;t created any support tickets yet. If you need help, feel free to create one!
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Create Your First Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{ticket.subject}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Created {new Date(ticket.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {ticket.admin_response && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">Response from Support</h4>
                        {ticket.status === 'waiting_response' && (
                          <Button
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            Reply
                          </Button>
                        )}
                      </div>
                      <p className="text-blue-800">{ticket.admin_response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Customer Response Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Reply to: {selectedTicket.subject}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 mb-2">Support Response:</p>
                <p className="text-blue-800">{selectedTicket.admin_response}</p>
              </div>
              
              <div>
                <Label htmlFor="customerResponse">Your Reply</Label>
                <Textarea
                  id="customerResponse"
                  rows={6}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTicket(null);
                    setResponseText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleCustomerResponse(selectedTicket.id)}
                  disabled={responding || !responseText.trim()}
                >
                  {responding ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}