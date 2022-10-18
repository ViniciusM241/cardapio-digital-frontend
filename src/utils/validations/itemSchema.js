import Joi from 'joi';
import messages from './messages';

const schema = Joi.object().keys({
  name: Joi.string().required().label('Nome').messages(messages),
  description: Joi.string().required().label('Descrição').messages(messages),
  value: Joi.string().required().label('Valor').messages(messages),
  categoryId: Joi.required().disallow('').label('Categoria').messages(messages),
  extraItems: Joi.array().required().label('Extras').messages(messages),
});

export default schema;
