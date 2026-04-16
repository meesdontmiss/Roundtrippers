import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MEETINGS = [
  {
    day: "Monday",
    time: "9:00 PM EST",
    name: "The Monday Night Meltdown",
    description: "For those who spent the weekend watching charts and need to talk about it.",
    format: "Open Discussion",
    emoji: "🫠",
    platform: "Twitter Spaces",
  },
  {
    day: "Tuesday",
    time: "8:00 PM EST",
    name: "Memecoin Survivors Circle",
    description: "Specifically for those who lost five figures or more on animal-themed tokens.",
    format: "Sharing Circle",
    emoji: "🐕",
    platform: "Discord Stage",
  },
  {
    day: "Wednesday",
    time: "10:00 PM EST",
    name: "Leverage Anonymous",
    description: "A safe space for people who got liquidated and immediately re-leveraged.",
    format: "Step Study",
    emoji: "📉",
    platform: "Twitter Spaces",
  },
  {
    day: "Thursday",
    time: "9:00 PM EST",
    name: "The 'I Should Have Sold' Workshop",
    description: "Guided reflection on moments when the sell button was right there and you chose suffering instead.",
    format: "Workshop",
    emoji: "🚪",
    platform: "Discord Stage",
  },
  {
    day: "Friday",
    time: "11:00 PM EST",
    name: "Weekend Warriors Pre-Game",
    description: "Preparation for the psychological torture of a 48-hour market that never sleeps.",
    format: "Open Discussion",
    emoji: "⚔️",
    platform: "Twitter Spaces",
  },
  {
    day: "Saturday",
    time: "3:00 PM EST",
    name: "Family & Friends of Roundtrippers",
    description: "For the loved ones of those who are down bad. You are not alone either.",
    format: "Support Group",
    emoji: "👪",
    platform: "Discord Stage",
  },
  {
    day: "Sunday",
    time: "8:00 PM EST",
    name: "The Sunday Scaries",
    description: "The market opens in Asia in 4 hours and you haven't processed last week's losses yet.",
    format: "Meditation & Sharing",
    emoji: "😰",
    platform: "Twitter Spaces",
  },
];

const MEETING_RULES = [
  "What happens in the room stays in the room (unless it's funny enough for a tweet)",
  "No shilling your bags. We're here to grieve, not recruit.",
  "Respect all levels of pain. A $20k loss hurts just as much as a $2M loss. (It doesn't, but we say it does.)",
  "No unsolicited trading advice. We're all terrible at this.",
  "Crying is encouraged. Ugly crying is rewarded.",
  "If you're currently in profit, please leave. This is not for you. Yet.",
];

export default function MeetingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Weekly Schedule
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-clinical-blue-dark mb-2">
              Group Session Directory
            </h1>
            <p className="text-muted-foreground">
              Scheduled therapeutic sessions for verified patients. Walk-ins welcome.
            </p>
          </div>

          {/* Meeting Room Banner */}
          <div className="mb-8 p-6 rounded-xl border border-primary/20 bg-primary-light text-center">
            <p className="text-sm text-muted-foreground mb-2">
              All meetings take place in our
            </p>
            <h2 className="text-xl font-bold text-primary mb-2">
              Official Discord & Twitter Spaces
            </h2>
            <p className="text-xs text-muted-foreground">
              Wallet verification required for participation. Listeners welcome.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button className="px-4 py-2 bg-[#5865F2] text-white text-sm font-semibold rounded-md hover:bg-[#5865F2]/90 transition-colors">
                Join Discord
              </button>
              <button className="px-4 py-2 bg-clinical-blue-dark text-white text-sm font-semibold rounded-md hover:opacity-90 transition-colors">
                Follow on X
              </button>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="space-y-4 mb-12">
            {MEETINGS.map((meeting) => (
              <div
                key={meeting.day}
                className="p-5 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{meeting.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-lg">{meeting.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {meeting.format}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {meeting.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {meeting.day}s
                      </span>
                      <span>{meeting.time}</span>
                      <span className="text-primary">{meeting.platform}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Rules */}
          <div className="p-6 rounded-xl border border-border bg-white shadow-sm">
            <h2 className="text-xl font-bold text-clinical-blue-dark mb-4 flex items-center gap-2">
              <span>📋</span> Session Guidelines
            </h2>
            <ol className="space-y-3">
              {MEETING_RULES.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Closing */}
          <div className="mt-12 text-center bg-white p-8 rounded-xl border border-border shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Facility Hours</p>
            <blockquote className="text-lg italic text-foreground">
              &quot;The room is always open. Because the market never
              closes. And neither does our pain.&quot;
            </blockquote>
            <p className="mt-3 text-xs text-muted-foreground">24/7 during market hours (which is always)</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
