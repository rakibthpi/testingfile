import { Schema, model, connect, Model } from 'mongoose';

export type IName = {
  firstName: string;

  middleName?: string;
  lastName?: string;
};
export type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export type IStudent = {
  id: string;
  password: string;
  name: IName;
  gender: 'male' | 'female';
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  guardian: IGuardian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

export interface studentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}

// export type IStudentMethods = {
//   isUserExists(id: string): Promise<IStudent | null>;
// };

// export type studentModel = Model<
//   IStudent,
//   Record<string, never>,
//   IStudentMethods
// >;
