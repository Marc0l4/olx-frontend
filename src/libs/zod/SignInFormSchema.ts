import { z } from 'zod';

export const SignInFormSchema = z.object({
    email: z.string().email('Email é obrigatorio'),
    password: z.string().min(4, 'A senha precisa ter mais que 4 caracteres')
});