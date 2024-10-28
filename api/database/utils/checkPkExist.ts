import { ValidationError } from "class-validator";
import { Model, ModelStatic } from "sequelize";

type DtoInstance = { [key: string]: any };

export default async function checkPkExist<T extends Model>(
  modelClass: ModelStatic<T>,
  dtoInstance: DtoInstance
): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];

  for (const key in dtoInstance) {
    const pk = dtoInstance[key];
    const exist = await modelClass.findByPk(pk);

    if (!exist) {
      const error = new ValidationError();
      error.property = key;
      error.constraints = {
        notExist: `${pk}`,
      };
      errors.push(error);
    }
  }

  return errors;
}
