import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: IStudent) => {
  if (await Student.isUserExists(student.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(student);

  // This is instance method
  // const studentData = new Student(student);
  // if (await studentData.isUserExists(student.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await studentData.save();
  // End of instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string | number) => {
  let query: Record<string, any> = { id: id }; // Default to searching by `id`
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: new mongoose.Types.ObjectId(id) }; // Search by `_id` if valid ObjectId
  }
  const result = await Student.aggregate([
    {
      $match: query,
    },
  ]);
  return result;
};

const deletedStudentFromDB = async (id: string | number) => {
  console.log(id);
  const result = await Student.updateOne(
    { _id: new Object(id) },
    { isDeleted: true }
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
};
