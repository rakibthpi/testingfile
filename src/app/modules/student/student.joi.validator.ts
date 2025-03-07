import Joi from 'joi';

// Name Schema
const nameSchema = Joi.object({
  firstName: Joi.string().min(2).max(22).required().messages({
    'string.base': 'First name must be a string.',
    'string.min': 'First name must have at least 2 characters.',
    'string.max': 'First name must not exceed 50 characters.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Last name must be a string.',
    'string.min': 'Last name must have at least 2 characters.',
    'string.max': 'Last name must not exceed 50 characters.',
    'any.required': 'Last name is required.',
  }),
  middleName: Joi.string().optional().messages({
    'string.base': 'Middle name must be a string.',
  }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().min(2).max(100).required().messages({
    'string.base': "Father's name must be a string.",
    'string.min': "Father's name must have at least 2 characters.",
    'string.max': "Father's name must not exceed 100 characters.",
    'any.required': "Father's name is required.",
  }),
  fatherOccupation: Joi.string().min(2).max(100).required().messages({
    'string.base': "Father's occupation must be a string.",
    'string.min': "Father's occupation must have at least 2 characters.",
    'string.max': "Father's occupation must not exceed 100 characters.",
    'any.required': "Father's occupation is required.",
  }),
  fatherContactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': "Father's contact number must be 10 to 15 digits.",
      'any.required': "Father's contact number is required.",
    }),
  motherName: Joi.string().min(2).max(100).required().messages({
    'string.base': "Mother's name must be a string.",
    'string.min': "Mother's name must have at least 2 characters.",
    'string.max': "Mother's name must not exceed 100 characters.",
    'any.required': "Mother's name is required.",
  }),
  motherOccupation: Joi.string().min(2).max(100).required().messages({
    'string.base': "Mother's occupation must be a string.",
    'string.min': "Mother's occupation must have at least 2 characters.",
    'string.max': "Mother's occupation must not exceed 100 characters.",
    'any.required': "Mother's occupation is required.",
  }),
  motherContactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': "Mother's contact number must be 10 to 15 digits.",
      'any.required': "Mother's contact number is required.",
    }),
  address: Joi.string().min(5).max(255).required().messages({
    'string.base': 'Address must be a string.',
    'string.min': 'Address must have at least 5 characters.',
    'string.max': 'Address must not exceed 255 characters.',
    'any.required': 'Address is required.',
  }),
});

// Student Schema Validation
const studentJoiSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required.',
  }),
  name: nameSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': 'Gender must be either male or female.',
    'any.required': 'Gender is required.',
  }),
  contactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Contact number must be 10 to 15 digits.',
      'any.required': 'Contact number is required.',
    }),
  emergencyContactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Emergency contact number must be 10 to 15 digits.',
      'any.required': 'Emergency contact number is required.',
    }),
  dateOfBirth: Joi.date().iso().required().messages({
    'date.base': 'Date of birth must be a valid date.',
    'any.required': 'Date of birth is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        'Blood group must be a valid type (A+, A-, B+, B-, AB+, AB-, O+, O-).',
    }),
  academicSemester: Joi.string().required().messages({
    'any.required': 'Academic semester is required.',
  }),
  academicDepartment: Joi.string().required().messages({
    'any.required': 'Academic department is required.',
  }),
  academicFaculty: Joi.string().required().messages({
    'any.required': 'Academic faculty is required.',
  }),
  guardian: guardianSchema.required(),
  profileImage: Joi.string().uri().optional().messages({
    'string.uri': 'Profile image must be a valid URL.',
  }),
  isActive: Joi.string().valid('active', 'inactive').required().messages({
    'any.only': 'Status must be either active or inactive.',
    'any.required': 'Status is required.',
  }),
});

export default studentJoiSchema;
