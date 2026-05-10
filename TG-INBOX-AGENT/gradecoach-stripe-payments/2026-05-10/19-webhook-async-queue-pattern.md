# 19-webhook-async-queue-pattern
![](./19-webhook-async-queue-pattern.jpg)
- **Date:** 2026-05-10  •  **TG msg id:** 19
- **My caption:** (none)
- **Extracted text:**
  A webhook returning HTTP 200 should only mean the event was successfully received. Business processing should never happen inside the webhook controller itself. The ideal pattern is to acknowledge immediately, publish the event to a queue, and process it asynchronously for better scalability, resiliency, and retry handling. This becomes even more critical when the source system does not persist events for replay.
- **Summary:** The canonical answer to the Stripe webhook bug question — explaining that webhooks should immediately ACK with 200, then hand off to an async queue for actual business logic processing to ensure reliability.
- **Action / why I saved this:** Consider refactoring GradeCoach's Stripe webhook to the acknowledge-then-queue pattern to eliminate silent payment status failures.
