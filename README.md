# RentFlow BZ

RentFlow BZ is a Belize-focused rental management demo for landlords and tenants. The current application includes property and unit management, BZD rent tracking, payment review, utility splits, maintenance requests, notifications, and browser-local demo persistence.

## Run the web app

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The static export configuration also supports deployment to static hosting.

## Prepare the mobile app

The Next.js app exports static web assets into `out/`, which Capacitor can load in native Android and iOS shells.

```bash
npm install
npx cap add android
npx cap add ios
npm run mobile:sync
npx cap open android
npx cap open ios
```

Android builds require Android Studio and its SDK. iOS builds require macOS and Xcode. Add only the platform you plan to build on.

## Current demo limits

The supplied application stores its sample records in the current browser or device's local storage. It does not yet provide accounts, cloud sync, multi-user data, or a production payment service. Those require a backend and authentication before real tenant or payment data is used.
