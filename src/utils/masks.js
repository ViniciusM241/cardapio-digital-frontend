export const zipcode = (zipcode) => {
  return zipcode.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};

export const phone = (phone) => {
  return phone.replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/^(\(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{4,5})(\d{4})/, '$1-$2')
      .replace(/(-\d{5})\d+?$/, '$1');
};

export const currency = (value) => {
  value = value.replace(/\D/g, '');
  value = (value / 100).toFixed(2) + '';
  value = value.replace(".", ",");
  value = value.replace(/(d)(d{3})(d{3}),/g, "$1.$2.$3,");
  value = value.replace(/(d)(d{3}),/g, "$1.$2,");

  return value;
};

export function number(value) {
  return value.replace(/[^\d-]/g, "");
}
