<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Anonymous Donation Feature Specification</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

Allow donors to contribute anonymously while still collecting required payment information for legal and processing purposes.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Feature Requirements</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Donor Experience (Widget Project)</span>

</div>

**Donation Form Enhancement:**
- Add "Donate anonymously" checkbox on donation form
- Clear messaging about what anonymous means
- Explanation that payment details are still required

**User Interface:**
```
[ ] I'd like to donate anonymously
    ℹ️ Your name won't appear in the recent donors list, but we still 
       need your payment information for processing and tax purposes.
```

**Form Validation:**
- If anonymous = true, donor name still required for payment processing
- Email still required for receipt and confirmation
- All Stripe payment fields remain mandatory

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Admin Dashboard Integration</span>

</div>

**Recent Donors Display:**
```jsx
// In recent donors component
{donation.is_anonymous ? (
  <div className="anonymous-donor">
    <span>Anonymous Donor</span>
    <span className="amount">${donation.amount}</span>
  </div>
) : (
  <div className="named-donor">
    <span>{donation.donor_name}</span>
    <span className="amount">${donation.amount}</span>
  </div>
)}
```

**Organization Settings:**
- Toggle to enable/disable anonymous donations
- Analytics showing anonymous vs named donation ratios

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🗄️ Database Schema Update</span>

</div>

**Add to donations table:**
```sql
ALTER TABLE donations 
ADD COLUMN is_anonymous BOOLEAN DEFAULT false;

-- Index for analytics queries
CREATE INDEX idx_donations_anonymous ON donations(is_anonymous, organization_id);
```

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Implementation Flow</span>

</div>

1. **Donor selects anonymous donation** (Widget)
2. **Form validates all payment info** (Widget) 
3. **Payment processes normally** (Widget → Stripe)
4. **Donation saved with is_anonymous=true** (Database)
5. **Recent donors shows "Anonymous"** (Admin Dashboard)
6. **Analytics track both types** (Admin Dashboard)

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Technical Implementation</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Widget Project Changes</span>

</div>
```jsx
// In donation form component
const [isAnonymous, setIsAnonymous] = useState(false);

// Form submission
const donationData = {
  amount,
  donor_name: donorName, // Still collected for payment
  donor_email: donorEmail,
  is_anonymous: isAnonymous, // New field
  // ... other fields
};
```

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Admin Dashboard Changes</span>

</div>
```tsx
// In recent donors component  
interface Donation {
  id: string;
  amount: number;
  donor_name: string;
  donor_email: string;
  is_anonymous: boolean; // New field
  created_at: string;
}

// Display logic
const displayName = donation.is_anonymous ? "Anonymous Donor" : donation.donor_name;
```

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Privacy Considerations</span>

</div>

**What's Anonymous:**
- Name not shown in recent donors list
- Name not shown in public displays
- Name not included in exported donor lists (unless for tax purposes)

**What's Still Collected:**
- Full payment information (required by law)
- Email for receipts and confirmations  
- Transaction details for accounting
- All data available to organization admins in private reports

This feature primarily affects the **Widget project** with some display changes needed in the **Admin Dashboard project**.