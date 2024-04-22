type Event =
  | {
      type: "user_created";
      data: { email: string };
    }
  | {
      type: "generation_created";
      data?: undefined;
    }
  | {
      type: "user_logged_in";
      data: { userId: string };
    };

export async function notifyDiscord({ type, data }: Event) {
  let message = "";
  switch (type) {
    case "user_created":
      message = `🎉 New user created: ${data.email}`;
      break;
    case "generation_created":
      message = "🎉 New generation created for repo";
      break;
    case "user_logged_in":
      message = `🎉 User logged in: ${data.userId}`;
      break;
  }
  if (process.env.NODE_ENV !== "development") {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  }
}
