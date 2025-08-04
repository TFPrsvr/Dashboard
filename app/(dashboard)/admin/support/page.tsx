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
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, User, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SupportTicket {
  id: string;
  user_id: string;

  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;

  user_email?: string;
  user_name?: string;
  admin_response?: string;
  admin_id?: string;

  created_at: string;
  updated_at: string;
}

export default function AdminSupportPage() {
  const { userId } = useAuth();

  const { user } = useUser();

  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchAllTickets = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/support');
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
      fetchAllTickets();
    }
  }, [userId, fetchAllTickets]);


  const handleRespond = async (ticketId: string) => {
    if (!responseText.trim()) return;

    setResponding(true);
    try {
      const response = await fetch(`/api/admin/support/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_response: responseText,
          status: 'waiting_response'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to respond to ticket');
      }

      toast({
        title: "Response Sent",
        description: "Your response has been sent to the user.",
      });

      setResponseText("");
      setSelectedTicket(null);
      fetchAllTickets();
    } catch (error) {
      console.error("Error responding to ticket:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send response",
        variant: "destructive",
      });
    } finally {
      setResponding(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/support/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update ticket status');
      }

      toast({
        title: "Status Updated",
        description: `Ticket status changed to ${status}`,
      });

      fetchAllTickets();
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update status",
        variant: "destructive",
      });

    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
        return <AlertCircle className="w-4 h-4" />;

      case "waiting_response":
        return <Mail className="w-4 h-4" />;

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


  const filteredTickets = tickets.filter(ticket => {
    if (filter === "all") return true;
    if (filter === "open") return ticket.status === "open";
    if (filter === "in_progress") return ticket.status === "in_progress";
    if (filter === "urgent") return ticket.priority === "urgent";
    return true;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
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
          <h1 className="text-3xl font-bold">Support Management</h1>
          <p className="text-gray-600">Manage customer support tickets</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="text-2xl font-bold">{tickets.length}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Support Tickets</h3>
              <p className="text-gray-600">No support tickets have been created yet.</p>
            </CardContent>
          </Card>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{ticket.subject}</h3>
                    <p className="text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>From: {ticket.user_name || ticket.user_email}</span>
                      <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-900 mb-2">Admin Response</h4>
                    <p className="text-green-800">{ticket.admin_response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Select
                      value={ticket.status}
                      onValueChange={(status) => updateTicketStatus(ticket.id, status)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="waiting_response">Waiting Response</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedTicket(ticket)}
                    disabled={ticket.status === 'closed'}
                  >
                    Respond
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Response Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Respond to: {selectedTicket.subject}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Original Message:</p>
                <p>{selectedTicket.description}</p>
              </div>
              
              <div>
                <Label htmlFor="response">Your Response</Label>
                <Textarea
                  id="response"
                  rows={6}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
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
                  onClick={() => handleRespond(selectedTicket.id)}
                  disabled={responding || !responseText.trim()}
                >
                  {responding ? "Sending..." : "Send Response"}
                </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}