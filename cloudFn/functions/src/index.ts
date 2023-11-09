import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

// Your Stripe secret key
const sK =
"rk_test_51F7JQQKdCZ0D5io5FfdDyczO0tme3uyVKNJo27mqHkvY7hLItZDcWzeDofX0SuIgCJddI1DP5ABf16y3GaS0cK2b00EE7IMaUh";

// Your Stripe webhook secret key
const wK = "whsec_P9MefAq741UcWehJB7N5scw82Jaw1mcl";

// Initialize Stripe
const stripe = new Stripe(sK);

// Initialize Firebase Admin
admin.initializeApp();

// Stripe Webhook Cloud Function
// ... (your existing imports and initializations)

export const stripeWebhook = functions.https.onRequest(
  async (request, response) => {
    console.log("Stripe webhook called1");
    const sig = request.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    console.log("Stripe webhook called2");
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        wK
      );
      console.log("Stripe webhook called3");
    } catch (err:any) {
      console.log("Error in constructing event:", err);
      response.status(400).send(`Webhook Error: ${err.message}`).end();
      return;
    }
    console.log("Stripe webhook called4");
    console.log({event: JSON.stringify(event)});
    switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      console.log("Stripe webhook called5");
      // eslint-disable-next-line no-case-declarations
      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription object:", subscription); // Added log
      try {
        await updateUserProStatus(subscription);
      } catch (err: any) {
        console.log("Error in updateUserProStatus:", err); // Added log
      }
      response.json({received: true}).end();
      return;
    default:
      console.log("Unhandled event type");
      response.status(400).end();
      return;
    }
  }
);

const updateUserProStatus = async (subscription: Stripe.Subscription) => {
  console.log("Entering updateUserProStatus"); // Added log
  const userId = subscription.metadata.userId as string;
  console.log("here2", {userId});
  const isPro =
    subscription.status === "active" || subscription.status === "trialing";
  console.log("here3", {isPro});
  const userRef = admin.firestore().collection("users").doc(userId);
  await userRef.update({pro: isPro});

  if (subscription.cancel_at_period_end) {
    // date comes from stripe in seconds
    const endDate = new Date(subscription.current_period_end * 1000);
    await userRef.update({subscriptionEndDate: endDate});
  } else {
    await userRef.update({subscriptionEndDate: null});
  }
};
