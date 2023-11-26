// /app/api/auth/[...nextauth]/route.ts
// конфігурація автентифікації
import { authConfig } from '../../../../configs/auth';
// для створення обробника автентифікації
import NextAuth from 'next-auth'

// обробник автентифікації на основі конфігурації
const handler = NextAuth(authConfig);

// для обробки відповідних типів запитів
export { handler as GET, handler as POST }
