/*import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

async function dbConnect() {
  if (cached.con) {
    console.log("DB Verbindung aktiv");
    return cached.con;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, options)
      .then((mongoose) => {
        console.log("DB Verbindung gestartet");
        return mongoose;
      });
  }
  cached.con = await cached.promise;
  return cached.con;
}

async function dbDisconnect() {
  await mongoose.disconnect();
  console.log("DB Verbindung beendet");
}

const mongodb = { dbConnect, dbDisconnect };

export default mongodb;*/

import mongoose from "mongoose";

// Eine URI sollte immer vorhanden sein
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Bitte definiere die MONGODB_URI in deiner .env.local Datei");
}

// Globales Caching für Serverless-Umgebungen (z.B. Next.js API Routes)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Wenn bereits eine aktive Verbindung existiert, nutze diese
  if (cached.conn) {
    //console.log("DB Verbindung aktiv (Cached)");
    return cached.conn;
  }

  // Wenn noch kein Verbindungs-Promise existiert, erstelle eines
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Verhindert, dass Mongoose Befehle in die Warteschlange stellt, wenn die DB offline ist
    };

    console.log("Starte neue DB Verbindung...");
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => {
        //console.log("DB Verbindung erfolgreich hergestellt");
        return mongooseInstance;
      });
  }

  try {
    // Warte auf das Promise und speichere die Instanz
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Promise zurücksetzen bei Fehler, damit ein neuer Versuch gestartet werden kann
    throw e;
  }

  return cached.conn;
}

async function dbDisconnect() {
  if (process.env.NODE_ENV === "development") return; // In der Entwicklung nicht trennen wegen Hot-Reloading

  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
  //console.log("DB Verbindung beendet");
}

const mongodb = { dbConnect, dbDisconnect };
export default mongodb;
