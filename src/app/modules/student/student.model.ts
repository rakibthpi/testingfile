import { model, Schema } from 'mongoose';
import { IGuardian, IName, IStudent } from './student.interface';

const nameSchema = new Schema<IName>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  middleName: { type: String },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true },
  name: nameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true, unique: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  academicSemester: { type: String, required: true },
  academicDepartment: { type: String, required: true },
  academicFaculty: { type: String, required: true },
  guardian: guardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'inactive'],
});

// 3. Create a Model.
export const Student = model<IStudent>('Student', studentSchema);
