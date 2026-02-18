export const Errors = {
  ValidationError: 'ValidationError',
  StudentNotFound: 'StudentNotFound',
  ClassNotFound: 'ClassNotFound',
  AssignmentNotFound: 'AssignmentNotFound',
  ServerError: 'ServerError',
  ClientError: 'ClientError',
  StudentAlreadyEnrolled: 'StudentAlreadyEnrolled',
};

export function getMissingKeys(
  data: any,
  keysToCheckFor: string[],
): string[] {
  return keysToCheckFor.filter((key) => data[key] === undefined);
}

export const isObject = <T extends Record<string, any>>(
  val: any,
): val is T => {
  return (
    val !== null && typeof val === 'object' && !Array.isArray(val)
  );
};

export const isMissingKeys = (
  data: any,
  keysToCheckFor: string[],
) => {
  for (let key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  }
  return false;
};

export const isValidID = (id: unknown): id is string => {
  return typeof id === 'string' && isUUID(id);
};

export function isUUID(id: string) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id,
  );
}

export const parseForResponse = (data: unknown) => {
  return JSON.parse(JSON.stringify(data));
};
