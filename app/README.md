# Site Builder app (iPhone and Android)

The app packages the website's own pages (dashboard, sign in, the editor) with
[Capacitor](https://capacitorjs.com), so customers can build, publish and manage
their sites from their phone. Everything they do syncs with the website, because
both use the same accounts (Supabase).

## Build it

You need a Mac with Xcode for iPhone, or Android Studio for Android.

```sh
cd app
npm install
npm run ios        # copies the site in, then opens the Xcode project
npm run android    # same, for Android Studio
```

In Xcode, pick your team under Signing & Capabilities, then Product, Archive, and
upload to App Store Connect. Run `npm run sync` again whenever the website changes.

- App name: **Site Builder** · Bundle ID: `com.seasidehaven.sitebuilder`
  (change both in `capacitor.config.json` before the first upload if you like).
- Icon and launch screen use the Seaside Haven logo.

## Payments in the app, and Apple's rules

Checkout opens Stripe's secure card page in a sheet inside the app (cards, Apple Pay,
Google Pay). When the customer taps Done, the app picks up their new plan.

- **Studio packages** (template sites, custom builds, revamps, care plans) are work
  done by people, so Apple allows card payment for them in every country
  (App Review Guideline 3.1.3(e) and 3.1.5).
- **Site editor plans** ($5 a month, $49 to buy) are digital. In the **United States**
  storefront, apps may link to their own card checkout. For other countries Apple
  requires In-App Purchase, so release the app in the US only at first, or ask for
  In-App Purchase to be added before going wider.
- In App Store Connect, under App Review Information, a note helps:
  "Studio services are human design work paid by card (3.1.3(e)). Hosting plans link to
  web checkout in the US storefront only."

Apple's rules on this have changed often since 2025, so check the current
[App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/#payments)
before you submit.
