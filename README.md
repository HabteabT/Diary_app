```yaml

project:

&nbsp; name: Diary\_app

&nbsp; description: >

&nbsp;   A cross-platform Diary / Journal mobile app built with React Native (Expo)

&nbsp;   and Firebase. Users can sign up/login, write diary entries, and manage their

&nbsp;   data securely.



overview:

&nbsp; summary: >

&nbsp;   Diary\_app is a simple, clean journaling app that focuses on usability,

&nbsp;   security, and clear navigation.

&nbsp; features:

&nbsp;   - Firebase authentication (login / signup)

&nbsp;   - Create, edit, and manage diary entries

&nbsp;   - Clear navigation between screens

&nbsp;   - Secure configuration using environment variables

&nbsp;   - No secrets committed to GitHub



project\_structure:

&nbsp; root: Diary-app

&nbsp; folders:

&nbsp;   assets: App assets (icons, static resources)

&nbsp;   functions: Firebase Cloud Functions (optional backend logic)

&nbsp;   images: App images and UI resources

&nbsp;   Modals: Modal components

&nbsp;   navigation: Navigation setup (tabs / stacks)

&nbsp;   Screens: Application screens (Login, Home, Diary, Summary, etc.)

&nbsp;   my-app: Legacy or optional folder (can be removed if unused)

&nbsp; files:

&nbsp;   .gitignore: Ignores .env and other sensitive files

&nbsp;   .runtimeconfig.json: Runtime configuration

&nbsp;   App.js: Application entry point

&nbsp;   app.json: Expo configuration

&nbsp;   babel.config.js: Babel configuration

&nbsp;   eas.json: Expo Application Services configuration

&nbsp;   firebase.js: Firebase initialization (env-based)

&nbsp;   firebase.json: Firebase project configuration

&nbsp;   package.json: Dependencies and scripts

&nbsp;   README.md: Project documentation

&nbsp; notes:

&nbsp;   - node\_modules is intentionally excluded from the repository



tech\_stack:

&nbsp; frontend: React Native (Expo)

&nbsp; navigation: React Navigation

&nbsp; backend:

&nbsp;   - Firebase Authentication

&nbsp;   - Firebase Firestore

&nbsp; storage: AsyncStorage

&nbsp; cloud\_functions: Firebase Functions (optional)



security:

&nbsp; public\_safe: true

&nbsp; measures:

&nbsp;   - Environment variables stored in .env

&nbsp;   - .env ignored by git

&nbsp;   - No API keys or secrets committed

&nbsp; verified\_by:

&nbsp;   - git status shows clean working tree

&nbsp;   - git check-ignore confirms .env is ignored



installation:

&nbsp; clone:

&nbsp;   command: git clone https://github.com/HabteabT/Diary\_app.git

&nbsp; setup:

&nbsp;   - cd Diary-app

&nbsp;   - npm install



usage:

&nbsp; run\_app:

&nbsp;   command: npx expo start

&nbsp;   options:

&nbsp;     - Scan QR code with Expo Go (Android / iOS)

&nbsp;     - Press "a" for Android emulator

&nbsp;     - Press "w" for web

&nbsp; firebase\_functions\_optional:

&nbsp;   steps:

&nbsp;     - cd functions

&nbsp;     - npm install

&nbsp;     - firebase emulators:start



environment\_variables:

&nbsp; file: .env

&nbsp; ignored\_by\_git: true

&nbsp; variables:

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_API\_KEY: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_AUTH\_DOMAIN: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_PROJECT\_ID: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_STORAGE\_BUCKET: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_MESSAGING\_SENDER\_ID: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_APP\_ID: xxxxx

&nbsp;   EXPO\_PUBLIC\_FIREBASE\_MEASUREMENT\_ID: xxxxx

&nbsp; restart\_required:

&nbsp;   command: npx expo start -c



troubleshooting:

&nbsp; expo\_cache:

&nbsp;   command: npx expo start -c

&nbsp; dependency\_mismatch:

&nbsp;   command: npx expo install

&nbsp; node\_modules\_windows:

&nbsp;   steps:

&nbsp;     - rmdir /s /q node\_modules

&nbsp;     - npm install



open\_source:

&nbsp; contributions: >

&nbsp;   Contributions are welcome via pull requests.

```



