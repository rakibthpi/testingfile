import { Schema, model, connect } from 'mongoose';

export type IName = {
  firstName: string;
  lastName: string;
  middleName?: string;
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
  profileImage: string;
  isActive: 'active' | 'inactive';
};
