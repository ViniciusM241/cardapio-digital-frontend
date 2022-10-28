import Joi from 'joi';
import messages from './messages';

const schema = Joi.object().keys({
  name: Joi.string().required().label('Nome').messages(messages),
  email: Joi.string().required().label('E-mail').messages(messages),
  password: Joi.string().required().label('Senha').min(6).messages(messages),
  confirmPassword: Joi.required().valid(Joi.ref('password')).label('Confirmar Senha').messages(messages),
});

export default schema;
