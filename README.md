# Modern SaaS Dashboard

A modern SaaS dashboard built with Next.js, Tailwind CSS, and Supabase.

## Features

- 🔐 Authentication with Supabase
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 📊 Analytics dashboard
- 📝 Content management
- 👥 Community management
- 📈 Marketing tools
- 💰 Sales management
- 🛍️ Storefront management
- ⚙️ Settings management
- 📚 Help center

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saas-dashboard.git
cd saas-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── layout/           # Layout components
└── lib/                  # Utility functions and configurations
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Supabase](https://supabase.io/) - Backend as a Service
- [Lucide Icons](https://lucide.dev/) - Icon set

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
