# Udemy-Ionic5 - News
- Course: https://www.udemy.com/course/ionic-ios-android-pwa-appstore-playstore-push/
- Documentation: https://github.com/mmiguel89/udemy-ionic5-docs
- Lecture: Sección 8: Aplicación de noticias

## Prerequisites (just android, IOS deloy is not considered)
- Node 16.8.0 (nvm use 16.8.0)
- NPM 7.21.1 (automatic)
- Ionic Cli 6.17.1
- python 2.7.18
- Cordova 10.0.0 (API level 30. Minimal for actual apb bundle on Google Play Store)
- Gradle 6.4
- Android Studio with emulator 3.6.3
- ANDROID_SDK_HOME to Android Studio SDK
- Run sdkmanager --licenses and accept licences (ANDROID_SDK_HOME/tools/bin)
- Dev mode on emulator or USB connected device (System > About device > Click several times to dev mode)

## Native
- in-app-browser
- social-sharing

## Steps just for serve
1) rm node_modules
2) rm package-lock.json
3) npm install
4) ionic serve


## Step for run with capcitor for android
1) ionic build
2) ionic capacitor add android
3) ionic capacitor copy android
4) Open Android Studio > Open > Run


## Live reload for android
ionic capacitor run android -l --host=192.168.1.104

