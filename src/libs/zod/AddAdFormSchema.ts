import { z } from 'zod';

export const AddAdFormSchema = z.object({
    title: z.string().min(3, 'O titulo precisa ter no minimo 3 letras'),
    category: z.string().min(3, 'A categoria precisa ser válido'),
    price: z.string().min(2, 'O anuncio precisa ter um preço'),
    desc: z.string().min(4, 'Precisa ter um descrição')
});