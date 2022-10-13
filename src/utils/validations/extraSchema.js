import Joi from 'joi';
import messages from './messages';

const schema = Joi.object().keys({
  name: Joi.string().required().label('Nome').messages(messages),
  value: Joi.string().required().label('Valor').messages(messages),
});

export default schema;
