import Joi from 'joi';
import messages from './messages';

const schema = Joi.object().keys({
  fullName: Joi.string().required().label('Nome Completo').max(50).min(10).messages(messages),
  phone: Joi.string().required().label('Número WhatsApp').min(12).messages(messages),
  deliveryMethod: Joi.string().required().label('Forma de entrega').valid('DELIVERY', 'TAKEOUT').messages(messages),
  number: Joi.string().when(
    'deliveryMethod',
    {
      is: 'DELIVERY',
      then: Joi.required(),
      otherwise: Joi.allow(''),
    }
  ).label('Número').messages(messages),
  address: Joi.string().when(
    'deliveryMethod',
    {
      is: 'DELIVERY',
      then: Joi.required(),
      otherwise: Joi.allow(''),
    }
  ).label('Endereço').messages(messages),
  district: Joi.string().when(
    'deliveryMethod',
    {
      is: 'DELIVERY',
      then: Joi.required(),
      otherwise: Joi.allow(''),
    }
  ).label('Bairro').messages(messages),
  paymentMethod: Joi.string().required().label('Forma de pagamento').valid('PIX', 'CASH', 'CREDIT', 'DEBIT').messages(messages),
  change: Joi.string().label('Troco').when(
    'paymentMethod',
    {
      is: 'CASH',
      then: Joi.required().allow(''),
      otherwise: Joi.allow(''),
    }
  ).messages(messages),
  customerId: Joi.number().required(),
  noChange: Joi.array(),
});

export default schema;
