import { z } from 'zod';

export const SignUpFormSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter no minimo 3 letras'),
    state: z.string().min(2, 'O estado precisa ser válido'),
    email: z.string().email('Email é obrigatorio'),
    password: z.string().min(4, 'A senha precisa ter mais que 4 caracteres'),
    confirmPassword: z.string().min(4, 'As senhas precisam ser iguais')
});