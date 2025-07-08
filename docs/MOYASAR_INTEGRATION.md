# Moyasar Payment Integration

This document describes the implementation of Moyasar payment gateway integration in the checkout process.

## Overview

The integration includes:
- Credit card form with validation
- Tokenization via Moyasar API
- 3D Secure (3DS) support with modal iframe
- Payment success handling

## Components

### 1. CreditCardForm (`src/components/checkout/CreditCardForm.tsx`)
- Handles credit card input with formatting
- Validates card details using Zod schema
- Submits payment data to parent component

### 2. ThreeDSecureModal (`src/components/checkout/ThreeDSecureModal.tsx`)
- Modal dialog for 3D Secure verification
- Contains iframe for bank verification page
- Handles completion callback

### 3. Payment Success Page (`src/app/payment-success/page.tsx`)
- Handles callback from Moyasar
- Displays payment status
- Shows payment token for debugging

## API Integration

### Tokenization Request
```javascript
POST https://api.moyasar.com/v1/tokens
Content-Type: application/json
Authorization: Basic {base64(public_key:)}

{
  "number": "4111111111111111",
  "holder_name": "John Doe",
  "expiry_month": "12",
  "expiry_year": "2025",
  "cvc": "123",
  "callback_url": "https://yourdomain.com/payment-success"
}
```

### Response Handling
- **Success without 3DS**: Redirect to success page
- **3DS Required**: Show modal with `transaction_url`
- **Error**: Display error message

## Configuration

### Environment Variables
Add to your `.env.local`:
```env
MOYASAR_PUBLIC_KEY=your_public_key_here
MOYASAR_SECRET_KEY=your_secret_key_here
```

### Update Checkout Page
Replace `YOUR_MOYASAR_PUBLIC_KEY` in `src/app/checkout/page.tsx` with your actual public key:

```javascript
"Authorization": `Basic ${btoa(process.env.NEXT_PUBLIC_MOYASAR_PUBLIC_KEY + ":")}`,
```

## Usage Flow

1. **User selects "Card Payment"** in checkout
2. **Credit card form appears** with validation
3. **Form submission** sends data to Moyasar tokenization API
4. **If 3DS required**: Modal opens with bank verification iframe
5. **After verification**: User clicks "Done" to complete
6. **Redirect to success page** with payment token

## Security Notes

- Card data is never stored locally
- All communication with Moyasar is encrypted
- Public key is used for tokenization (safe for frontend)
- Secret key should only be used on backend for payment processing

## Testing

### Test Cards
- **Visa**: 4111111111111111
- **Mastercard**: 5555555555554444
- **Mada**: 4462030000000000

### Test CVC
- Use any 3-digit number (e.g., 123)

### Test Expiry
- Use any future date (e.g., 12/25)

## Error Handling

The integration includes error handling for:
- Network failures
- Invalid card data
- 3DS verification failures
- API errors

## Customization

### Styling
- All components use Tailwind CSS
- Colors and styling can be customized in component files
- RTL support is included for Arabic text

### Validation
- Card validation rules are in `src/lib/schemas/checkout.ts`
- Custom validation can be added to the payment schema

### Callback URL
- Currently hardcoded as `https://yourdomain.com/payment-success`
- Update in `handlePaymentSubmit` function
- Ensure the URL matches your domain

## Backend Integration

For production use, you should:
1. Create a backend endpoint to handle payment processing
2. Use the secret key on the backend only
3. Verify payment tokens server-side
4. Update order status based on payment confirmation
5. Send confirmation emails

## Support

For Moyasar API documentation and support:
- [Moyasar Documentation](https://docs.moyasar.com/)
- [API Reference](https://docs.moyasar.com/api)
- [3D Secure Guide](https://docs.moyasar.com/3d-secure) 