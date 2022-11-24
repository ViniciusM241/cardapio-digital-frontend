import Joi from 'joi';
import messages from './messages';

const schema = Joi.object().keys({
  businessNumber: Joi.string().required().min(12).label('Numero do WhatsApp:').messages(messages),
  deliveryTime: Joi.string().allow('').label('Tempo de Entrega').messages(messages),
  takeoutTime: Joi.string().allow('').label('Tempo de Retirada').messages(messages),
  pix: Joi.string().allow('').label('Pix').messages(messages),
  deliveryFee: Joi.string().allow('').label('Taxa de Entrega').messages(messages),
});

export default schema;
