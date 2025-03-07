import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),

  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .min(10, 'Father contact number must be at least 10 digits'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z
    .string()
    .min(10, 'Mother contact number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
});

export const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  password: z.string().min(1, 'Password is required'),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  contactNo: z
    .string()
    .min(6, 'Contact number must be at least 6 digits')
    .max(15, 'Contact number cannot exceed 12 digits'),
  emergencyContactNo: z
    .string()
    .min(10, 'Emergency contact number must be at least 10 digits'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  academicSemester: z.string().min(1, 'Academic semester is required'),
  academicDepartment: z.string().min(1, 'Academic department is required'),
  academicFaculty: z.string().min(1, 'Academic faculty is required'),
  guardian: guardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted: z.boolean().default(false),
});
