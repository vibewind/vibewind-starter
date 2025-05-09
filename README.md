# Vibewind Starter

A modern Next.js application with Clerk authentication and Supabase backend integration.

For more information, visit [vibewind.com](https://vibewind.com).

## Features

- 🔐 Authentication with Clerk
- 📦 Supabase Database Integration
- 🔄 Clerk-Supabase Sync
- 🛣️ Protected Routes with Middleware
- 📱 Responsive Design with Tailwind CSS
- 🎯 TypeScript Support
- 🏃‍♂️ Fast Development with Next.js

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Clerk account
- A Supabase account

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/whferr/vibewind-starter.git
   cd vibewind-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Supabase Setup**
   
   Create the following table in your Supabase database:

   ```sql
   -- Create users table
   create table public.users (
     id uuid primary key default uuid_generate_v4(),
     clerk_id text not null unique,
     email text not null unique,
     first_name text,
     last_name text,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );

   -- Enable Row Level Security (RLS)
   alter table public.users enable row level security;

   -- Create policies
   create policy "Users can view their own data"
     on public.users
     for select
     using (auth.uid()::text = clerk_id);

   create policy "Service role can manage all users"
     on public.users
     using (auth.jwt()->>'role' = 'service_role');
   ```

5. **Development**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

6. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
vibewind/
├── app/                # Next.js application routes and components
├── utils/             # Utility functions and configurations
│   ├── supabase.ts    # Supabase client configuration
│   └── user-sync.ts   # Clerk-Supabase user synchronization
├── types/             # TypeScript type definitions
├── middleware.ts      # Authentication and routing middleware
├── public/            # Static assets
└── styles/           # Global styles and Tailwind configuration
```

## Database Structure

### Users Table
The `users` table maintains synchronization between Clerk and Supabase:

- `id` (uuid, primary key): Unique identifier for the user in Supabase
- `clerk_id` (text, unique): Clerk's user ID
- `email` (text, unique): User's email address
- `first_name` (text, nullable): User's first name
- `last_name` (text, nullable): User's last name
- `created_at` (timestamptz): Record creation timestamp
- `updated_at` (timestamptz): Record update timestamp

### Row Level Security (RLS)
The following policies are enabled on the `users` table:

1. **Read Access**: Users can only view their own data
   - Policy name: "Users can view their own data"
   - Applies to: SELECT operations
   - Check: `auth.uid()::text = clerk_id`

2. **Admin Access**: Service role can manage all users
   - Policy name: "Service role can manage all users"
   - Applies to: ALL operations
   - Check: `auth.jwt()->>'role' = 'service_role'`

### User Synchronization
User data synchronization between Clerk and Supabase is handled by `utils/user-sync.ts`:
- Automatically syncs user data on authentication
- Uses upsert operation for reliable updates
- Handles both new user creation and profile updates
- Uses service role for bypassing RLS during sync

## Authentication Flow

1. Users can sign up/sign in using Clerk authentication
2. Protected routes are managed through middleware
3. User data syncs automatically between Clerk and Supabase using our custom sync utility

## Available Routes

- `/` - Public homepage
- `/sign-in/*` - Clerk sign-in pages
- `/sign-up/*` - Clerk sign-up pages
- `/dashboard` - Protected dashboard (requires authentication)

## Tech Stack

- **Frontend**: Next.js 15.0.0
- **Authentication**: Clerk
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React (Context if needed)

## Development Guidelines

1. Use TypeScript for all new files
2. Follow the existing project structure
3. Use Tailwind CSS for styling
4. Implement proper error handling
5. Keep components modular and reusable

## Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `middleware.ts` - Route protection and authentication middleware

## Important Notes

- Ensure all environment variables are properly set before running the application
- Keep your Clerk and Supabase keys secure
- Don't commit the `.env.local` file to version control
- Use the service role key only for server-side operations
- Always use the user sync utility for managing user data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project as a template for your own applications. 