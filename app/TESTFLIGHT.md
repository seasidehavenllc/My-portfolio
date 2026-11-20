# Automatic TestFlight uploads

Every time a pull request is merged into `main` and it changes the app or the website
pages the app packages, GitHub builds the iPhone app and uploads it to TestFlight by
itself. You no longer need to pull, open Xcode, raise the build number, archive and upload.

- It takes about 15 to 25 minutes. Watch it under the repository's **Actions** tab,
  "iPhone app to TestFlight". Apple then needs another 5 to 30 minutes to process the build
  before it shows in TestFlight.
- The build number goes up by one each time (13, 14, 15 and so on), one higher than the
  highest build already in App Store Connect.
- To build without merging anything: **Actions** tab, "iPhone app to TestFlight",
  **Run workflow**.
- Cost: the repository is public, so GitHub's Mac build machines are free. (If it ever
  becomes private, each build would use about 150 to 250 of the plan's free Actions
  minutes, because Mac minutes count ten times.)
- The version people see (1.0.3) is still set in Xcode: General, Version. Change it there
  and merge when you want a new version number.

## One-time setup (about 15 minutes)

GitHub needs three things from Apple, saved as secrets. Never paste these into a chat
or an email; they go only into GitHub.

### 1. Make an App Store Connect API key

1. Go to [App Store Connect](https://appstoreconnect.apple.com), then **Users and Access**,
   then the **Integrations** tab, then **App Store Connect API** on the left.
   (The first time, click **Request Access** and accept.)
2. Under **Team Keys**, click **+** (Generate API Key).
3. Name it `GitHub`, set Access to **Admin**, click **Generate**.
4. On that page, copy down:
   - the **Issuer ID** (shown above the list of keys),
   - the **Key ID** of the new key.
5. Click **Download** next to the key. You get a file named `AuthKey_XXXXXXXX.p8`.
   Apple only lets you download it once, so keep it somewhere safe.

### 2. Export your distribution certificate from Xcode

1. On your Mac, open **Xcode**, then **Xcode** menu, **Settings**, **Accounts**.
2. Select your Apple ID, select your team, click **Manage Certificates**.
3. If there is no **Apple Distribution** certificate in the list, click **+** at the bottom
   left and choose **Apple Distribution**.
4. Right-click the **Apple Distribution** certificate and choose **Export Certificate**.
   Save it to your Desktop as `distribution.p12` and choose a password. Remember the password.
   (If Export is greyed out, the certificate was made on another Mac. Click **+** and
   make a new Apple Distribution certificate here, then export that one.)
5. Open the **Terminal** app and paste this line, then press Return:

   ```sh
   base64 -i ~/Desktop/distribution.p12 | pbcopy
   ```

   Nothing appears, but the certificate is now copied as text, ready to paste in step 3.

### 3. Add the secrets to GitHub

Go to the repository on GitHub, then **Settings**, **Secrets and variables**, **Actions**,
and click **New repository secret** once for each row. The name must match exactly.

| Name | What to paste |
|------|---------------|
| `DIST_CERT_P12_BASE64` | What the Terminal command copied (just paste) |
| `DIST_CERT_PASSWORD` | The password you chose when exporting the certificate |
| `ASC_KEY_ID` | The Key ID from step 1 |
| `ASC_ISSUER_ID` | The Issuer ID from step 1 |
| `ASC_KEY_P8` | Open `AuthKey_XXXXXXXX.p8` in TextEdit and paste everything, including the `BEGIN` and `END` lines |
| `APPLE_TEAM_ID` | Your 10-character Team ID: [developer.apple.com/account](https://developer.apple.com/account), under Membership details |

Then go to **Actions**, "iPhone app to TestFlight", and click **Run workflow** to try it.
After it works you can delete `distribution.p12` from your Desktop.

## If a build fails

Open the failed run on the Actions tab; the red step says what went wrong.

- "Missing GitHub secrets": one of the names above is missing or misspelled.
- Anything about the certificate or password: export it again and replace
  `DIST_CERT_P12_BASE64` and `DIST_CERT_PASSWORD`.
- Anything about the API key: check Access is Admin and the three `ASC_` secrets.

The first run makes an App Store provisioning profile for the app on its own. It is listed
on the Apple Developer site under Profiles; leave it there.
