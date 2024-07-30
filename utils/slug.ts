import slugify from 'slugify';
import { uuidValidation } from '@/validations/uuid';

export const generateSlug = (name: string, id: string) => {
  const path = slugify(name, {
    lower: true,
    locale: 'vi',
  });

  return `${path}-${id}.html`;
};

export const decodeSlug = (path: string) => {
  const isMatch = path.match(uuidValidation);
  return isMatch ? isMatch[0] : null;
};
