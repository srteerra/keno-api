# Keno API 🚀

> AI-powered productivity tips API for developers

A NestJS REST API that generates practical, immediately actionable productivity
tips for developers across multiple categories using OpenAI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com/)

---

## ✨ Features

- 🤖 **AI-Generated Tips**: Powered by OpenAI for high-quality, contextual
  advice
- 🎯 **Multiple Categories**: Git, Terminal, Editor
- ⚡ **Instant Results**: No database required, pure API responses
- 🔒 **Type-Safe**: Built with TypeScript and Zod validation
- 🧪 **Well Tested**: Comprehensive unit and e2e tests
- 📦 **Easy Deploy**: Ready for Firebase, Vercel, Railway, or any Node.js
  platform
- 🎨 **Modular Architecture**: Easy to extend with new tip categories

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm or pnpm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/keno-api.git
cd keno-api

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your OpenAI API key to .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
PORT=3000
NODE_ENV=development
```

### Run Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api`

---

## 📖 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Get a Tip by Category

**Direct Routes:**

```http
GET /api/tips/git       # Git command tips
GET /api/tips/terminal  # Terminal/shell tips
GET /api/tips/editor    # Code editor tips
```

#### Available Categories

- `git_command` - Git version control tips
- `terminal` - Shell and terminal productivity
- `editor` - Code editor shortcuts and features

### Example cURL Request

```bash
# Get a Git tip
curl http://localhost:3000/api/tips/git
```

---

## 🏗️ Project Structure

```
src/
├── common/              # Shared utilities
│   ├── builders/        # Prompt builders
│   ├── constants/       # App constants
│   ├── exceptions/      # Custom exceptions
│   └── helpers/         # Helper functions
├── prompts/             # AI prompts
├── schemas/             # Zod validation schemas
├── tips/                # Tips module
│   ├── tips.controller.ts
│   ├── tips.service.ts
│   └── tips.module.ts
└── main.ts              # Application entry
```

---

### Available Scripts

```bash
# Development
npm run start:dev        # Start with hot-reload

# Testing
npm test                 # Run unit tests

# Code Quality
npm run lint             # Lint and fix
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking
```

### Code Style

This project uses:

- **ESLint** for linting
- **Prettier** for formatting
- **Husky** for pre-commit hooks
- **Conventional Commits** for commit messages

Commits are automatically formatted and linted before committing.

---

### Environment Variables

Make sure to set these in your deployment platform:

- `OPENAI_API_KEY` - Your OpenAI API key
- `OPENAI_MODEL` - Model to use (default: `gpt-4o-mini`)
- `NODE_ENV` - Set to `production`

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Adding a New Tip Category

1. **Create category rules** in `src/prompts/categories/your-category.ts`:

```typescript
export const YOUR_CATEGORY_RULES = `
## Your Category Tips:
- **Content format**: ...
- **Examples**: ...
- Focus on: ...
`;
```

2. **Update the builder** in `src/common/builders/prompt.builder.ts`:

```typescript
import { YOUR_CATEGORY_RULES } from '../../prompts/categories/your-category';

const CATEGORY_RULES: Record<Category, string> = {
  // ... existing categories
  your_category: YOUR_CATEGORY_RULES,
};
```

3. **Update the schema** in `src/schemas/result.schema.ts`:

```typescript
export const CategorySchema = z.enum([
  'git_command',
  'terminal',
  'editor',
  'react',
  'css',
  'typescript',
  'your_category', // Add here
]);
```

4. **Add endpoint** in `src/tips/tips.controller.ts`:

```typescript
@Get('/your-category')
async
tipYourCategory(@Res()
res: Response
)
{
  const result = await this.tipsService.getTip('your_category');
  return sendSuccess(res, result);
}
```

5. **Add tests** in `src/tips/tips.controller.spec.ts`

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Python tips category
fix: resolve parsing error in terminal tips
docs: update API documentation
style: format code with prettier
refactor: simplify prompt builder
test: add tests for CSS tips
chore: update dependencies
```

### Pull Request Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🧪 Testing

```bash
# Run all tests
npm test
```

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE)
file for details.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [OpenAI](https://openai.com/) - AI model provider
- [Zod](https://zod.dev/) - TypeScript-first schema validation

---

**Made with ❤️ by [Terra](https://github.com/srteerra)**
