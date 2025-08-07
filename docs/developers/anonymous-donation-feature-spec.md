# Anonymous Donation Feature Specification

## Overview

Allow donors to contribute anonymously while still collecting required payment information for legal and processing purposes.

## Feature Requirements

### Donor Experience (Widget Project)

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

### Admin Dashboard Integration

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

### Database Schema Update

**Add to donations table:**
```sql
ALTER TABLE donations 
ADD COLUMN is_anonymous BOOLEAN DEFAULT false;

-- Index for analytics queries
CREATE INDEX idx_donations_anonymous ON donations(is_anonymous, organization_id);
```

### Implementation Flow

1. **Donor selects anonymous donation** (Widget)
2. **Form validates all payment info** (Widget) 
3. **Payment processes normally** (Widget → Stripe)
4. **Donation saved with is_anonymous=true** (Database)
5. **Recent donors shows "Anonymous"** (Admin Dashboard)
6. **Analytics track both types** (Admin Dashboard)

## Technical Implementation

### Widget Project Changes
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

### Admin Dashboard Changes
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

### Privacy Considerations

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