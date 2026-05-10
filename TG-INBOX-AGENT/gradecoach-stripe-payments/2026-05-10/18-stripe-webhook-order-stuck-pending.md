# 18-stripe-webhook-order-stuck-pending
![](./18-stripe-webhook-order-stuck-pending.jpg)
- **Date:** 2026-05-10  •  **TG msg id:** 18
- **My caption:** it's worth checking my Grade Coach Stripe Payment flows to make sure everything is optimized and bulletproof
- **Extracted text:**
  Interviewer at Stripe:

  A payment succeeds. The customer is charged. Our DB shows the order as pending.

  The webhook from the payment processor was received.

  The webhook handler returned 200. The order never moved to paid.

  Where's the bug?
- **Summary:** A classic Stripe engineering interview question illustrating the silent failure mode where a webhook returns 200 OK but the database update to mark the order "paid" silently fails or never executes.
- **Action / why I saved this:** Audit GradeCoach's Stripe webhook handler to confirm it correctly updates subscription/payment status and has proper error handling before returning 200.
