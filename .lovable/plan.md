

# AI Customer Support Chatbot for Dude Tan

## What We're Building

A floating chat widget that appears on every page of your site. Customers can click it to open a chat window and ask questions about Dude Tan products, shipping, ingredients, how to use the tanner, etc. The AI will respond in the Dude Tan brand voice -- direct, slightly funny, like a real dude helping out.

## How It Works

1. **Enable Lovable Cloud** -- this gives us a backend and the AI gateway (no extra API keys needed)
2. **Create an Edge Function** (`supabase/functions/chat/index.ts`) that talks to the Lovable AI Gateway with a system prompt tuned to the Dude Tan brand voice and product knowledge
3. **Build a floating chat widget** component that lives in the app layout, with streaming responses rendered in real-time
4. **No database needed** -- conversations are session-only (no persistence unless you want it later)

## Technical Details

### Edge Function (`supabase/functions/chat/index.ts`)
- System prompt with Dude Tan product info, FAQ answers, brand voice guidelines
- Streams responses via SSE for real-time feel
- Handles rate limits (429) and credit errors (402) gracefully

### Chat Widget Component (`src/components/ChatWidget.tsx`)
- Floating button (bottom-right corner) with a chat icon
- Expandable chat panel with message history
- Streaming token-by-token rendering
- Markdown support for formatted responses
- Mobile responsive
- Styled to match the vintage barbershop aesthetic (warm tones, serif accents)

### Integration
- Added to `App.tsx` so it appears on every page
- Uses `react-markdown` for rendering AI responses

### System Prompt Will Include
- Product details (spray-on sunless tanner for men, fixes farmer tan)
- Brand voice rules (direct, funny, no spa/wellness language)
- Common FAQs (how to apply, dry time, ingredients, shipping, returns)
- Directs purchase questions to the shop page

## Steps

1. Enable Lovable Cloud and AI Gateway
2. Create the `chat` edge function with brand-tuned system prompt
3. Build the `ChatWidget` component with streaming support
4. Install `react-markdown` for response rendering
5. Add the widget to `App.tsx`

