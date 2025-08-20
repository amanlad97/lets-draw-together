import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
    console.log(db);
    if (db.connections && db.connections[0]) {
      connection.isConnected = db.connections[0].readyState;
    } else {
      connection.isConnected = 0;
      console.warn("No database connection found.");
    }
    console.log(db);
    console.log("successfully connected");
  } catch (error) {
    console.log("Database failed", error);
  }
}
