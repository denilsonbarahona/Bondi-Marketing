import HomeUI from "./homeUI";

export default function Home() {
  return (
    <HomeUI
      firebaseConfig={{
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      }}
      amplitudeApiKey={process.env.AMPLITUDE}
      authEmail={process.env.EMAIL}
      authPassword={process.env.PASSWORD}
    />
  );
}
