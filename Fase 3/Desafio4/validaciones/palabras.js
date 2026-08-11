import Joi from 'joi';


export const palabraSchema = Joi.object({
  palabra: Joi.string().trim().min(1).required(),
});

export function validarPalabra(datos) {
  const { error, value } = palabraSchema.validate(datos);

  if (error) {
    return {
      ok: false,
      mensaje: error.details[0].message,
    };
  }

  return {
    ok: true,
    value,
  };
}

