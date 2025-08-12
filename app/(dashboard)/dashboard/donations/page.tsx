"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useOrganization } from "@/hooks/use-organization";
import { supabase } from "@/lib/supabase/supabase-client";
import { Download, TrendingUp, DollarSign, Users, Heart, Search, Filter, Target, Calendar, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, subWeeks, subMonths, subYears } from "date-fns";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function DonationsPage() {
  const { organization, loading: orgLoading } = useOrganization();
  const [donations, setDonations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalDonations: 0,
    averageDonation: 0,
    uniqueDonors: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [widgetCount, setWidgetCount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [amountFilter, setAmountFilter] = useState<"all" | "under100" | "100to500" | "over500">("all");
  const [timeFilter, setTimeFilter] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [chartPeriod, setChartPeriod] = useState<"30" | "60" | "90" | "6months" | "1year">("30");

  // Generate chart data based on selected period
  const generateChartData = (donationsData: any[], period: string) => {
    const periodConfig = {
      "30": { days: 30, format: "MMM dd" },
      "60": { days: 60, format: "MMM dd" },
      "90": { days: 90, format: "MMM dd" },
      "6months": { days: 180, format: "MMM yyyy" },
      "1year": { days: 365, format: "MMM yyyy" }
    };
    
    const config = periodConfig[period as keyof typeof periodConfig];
    const newChartData = Array.from({ length: config.days }, (_, i) => {
      const date = startOfDay(subDays(new Date(), config.days - 1 - i));
      return {
        date: format(date, config.format),
        amount: 0,
        count: 0,
      };
    });

    donationsData.forEach((donation) => {
      const donationDate = startOfDay(new Date(donation.created_at));
      const dayIndex = newChartData.findIndex(
        (day) => day.date === format(donationDate, config.format)
      );
      if (dayIndex !== -1) {
        newChartData[dayIndex].amount += donation.amount;
        newChartData[dayIndex].count += 1;
      }
    });

    setChartData(newChartData);
  };

  // Filter donations based on search and amount filters
  const filteredDonations = donations.filter((donation) => {
    // Search filter
    const searchMatch = searchTerm === "" || 
      (donation.donor_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (donation.donor_email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (donation.causes?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Amount filter
    let amountMatch = true;
    if (amountFilter !== "all") {
      switch (amountFilter) {
        case "under100":
          amountMatch = donation.amount < 100;
          break;
        case "100to500":
          amountMatch = donation.amount >= 100 && donation.amount <= 500;
          break;
        case "over500":
          amountMatch = donation.amount > 500;
          break;
      }
    }
    
    return searchMatch && amountMatch;
  });

  // Re-generate chart data when period changes
  useEffect(() => {
    if (donations.length > 0) {
      generateChartData(donations, chartPeriod);
    }
  }, [chartPeriod, donations]);

  useEffect(() => {
    async function fetchDonations() {
      if (!organization) return;

      try {
        // Get all widgets for this organization
        const { data: widgets } = await supabase
          .from("widgets")
          .select("id, goal_amount")
          .eq("organization_id", organization.id);

        if (!widgets || widgets.length === 0) return;

        setWidgetCount(widgets.length);
        setGoalAmount(widgets.reduce((sum, w) => sum + (w.goal_amount || 0), 0));

        const widgetIds = widgets.map(w => w.id);

        // Fetch donations for all widgets
        const { data: donationsData } = await supabase
          .from("donations")
          .select("*, causes(name)")
          .in("widget_id", widgetIds)
          .eq("status", "succeeded")
          .order("created_at", { ascending: false });

        if (donationsData) {
          setDonations(donationsData);

          // Calculate stats
          const total = donationsData.reduce((sum, d) => sum + d.amount, 0);
          const uniqueDonorEmails = new Set(
            donationsData.map((d) => d.donor_email).filter(Boolean)
          );

          setStats({
            totalRaised: total,
            totalDonations: donationsData.length,
            averageDonation:
              donationsData.length > 0 ? total / donationsData.length : 0,
            uniqueDonors: uniqueDonorEmails.size,
          });

          // Generate chart data based on selected period
          generateChartData(donationsData, chartPeriod);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!orgLoading) {
      fetchDonations();
    }
  }, [organization, orgLoading]);

  // Initialize chart data even when no donations exist
  useEffect(() => {
    if (chartData.length === 0) {
      generateChartData([], chartPeriod);
    }
  }, [chartPeriod, chartData.length]);

  const exportDonations = () => {
    // Use filtered donations for export
    const dataToExport = filteredDonations.length > 0 ? filteredDonations : donations;
    
    const csv = [
      [
        "Transaction ID", "Date", "Time", "Donor Name", "Donor Email", 
        "Amount", "Currency", "Cause", "Status", "Payment Method",
        "Organization", "Widget ID", "Donor Phone", "Donor Address",
        "Tax Deductible", "Receipt Sent", "Campaign", "Source"
      ],
      ...dataToExport.map((d) => [
        d.id,
        format(new Date(d.created_at), "yyyy-MM-dd"),
        format(new Date(d.created_at), "HH:mm:ss"),
        d.donor_name || "Anonymous",
        d.donor_email || "",
        d.amount,
        "USD", // Assuming USD, could be dynamic
        d.causes?.name || "General",
        d.status,
        d.payment_method || "Online",
        organization?.display_name || organization?.name || "",
        d.widget_id,
        d.donor_phone || "",
        d.donor_address || "",
        "Yes", // Assuming tax deductible
        d.receipt_sent ? "Yes" : "No",
        d.campaign || "",
        d.source || "Widget"
      ]),
    ]
      .map((row) => row.map(field => 
        typeof field === 'string' && field.includes(',') 
          ? `"${field.replace(/"/g, '""')}"` 
          : field
      ).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-${organization?.name || 'organization'}-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading || orgLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Donations</h1>
          <p className="text-gray-600 mt-1">
            Track and analyze your donation data
          </p>
        </div>
        <div className="flex items-center gap-4">
          {organization && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Donations for</p>
              <p className="font-semibold text-lg">{organization.display_name || organization.name}</p>
            </div>
          )}
          <Button onClick={exportDonations} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {stats.totalRaised.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donations
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDonations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal (To Be Raised)</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${goalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Fundraising target amount
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Widgets</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{widgetCount}</div>
            <p className="text-xs text-muted-foreground">
              Active donation widgets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Donations</Label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by donor name, email, or cause..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="amount">Amount Range</Label>
              <select
                id="amount"
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value as typeof amountFilter)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Amounts</option>
                <option value="under100">Under $100</option>
                <option value="100to500">$100 - $500</option>
                <option value="over500">Over $500</option>
              </select>
            </div>
            <div>
              <Label htmlFor="time">Time Period</Label>
              <select
                id="time"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as typeof timeFilter)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            {(searchTerm || amountFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setAmountFilter("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Donations ({filteredDonations.length} 
            {filteredDonations.length !== donations.length && ` of ${donations.length}`})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Donor</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Cause</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No donations match your current filters.</p>
                      {(searchTerm || amountFilter !== "all") && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchTerm("");
                            setAmountFilter("all");
                          }}
                          className="mt-2"
                        >
                          Clear Filters
                        </Button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredDonations.slice(0, 20).map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="p-2">
                      {format(new Date(donation.created_at), "MMM dd, yyyy")}
                    </td>
                    <td className="p-2">
                      <div>
                        <p className="font-medium">
                          {donation.donor_name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donation.donor_email}
                        </p>
                      </div>
                    </td>
                    <td className="p-2 font-medium">
                      ${donation.amount.toFixed(2)}
                    </td>
                    <td className="p-2">
                      {donation.causes?.name || "General"}
                    </td>
                    <td className="p-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredDonations.length > 20 && (
              <div className="text-center py-4 text-gray-600">
                Showing 20 of {filteredDonations.length} donations. Use filters to narrow results.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Donation Trends</CardTitle>
            <select
              value={chartPeriod}
              onChange={(e) => setChartPeriod(e.target.value as typeof chartPeriod)}
              className="text-sm rounded-md border border-input bg-background px-3 py-1"
            >
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0066cc"
                  fill="#0066cc"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Donation Count</CardTitle>
            <select
              value={chartPeriod}
              onChange={(e) => setChartPeriod(e.target.value as typeof chartPeriod)}
              className="text-sm rounded-md border border-input bg-background px-3 py-1"
            >
              <option value="30">Last 30 Days</option>
              <option value="60">Last 60 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value, 'Donations']}
                />
                <Bar dataKey="count" fill="#0066cc" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
