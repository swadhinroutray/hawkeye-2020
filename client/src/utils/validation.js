// export type ValidationResult = string;

export const validateRequired = (value, name) =>
	value && value !== '' ? '' : `${name} required`;

export const validateWithError = (predicate, err) => (predicate ? '' : err);

export const chainValidations = (...validations) => {
	for (const v of validations) {
		if (v.length > 0) return v;
	}
	return '';
};

// Type for mapping field names to validation functions
// export type FormValidations<F extends string | number> = {
// 	[field in F]?: (value: any, ...rest: any[]) => ValidationResult;
// };
