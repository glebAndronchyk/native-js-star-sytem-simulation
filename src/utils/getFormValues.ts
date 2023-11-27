export const getFormValues = (elements: HTMLFormControlsCollection) => {
  const result: Record<string, string> = {};

  for (let field of elements) {
    const castedField = field as HTMLInputElement;
    result[castedField.name] = castedField.value;
  }

  return result;
};
