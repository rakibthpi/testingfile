import { Request, Response } from 'express';
import { StudentServices } from './student.services';

const createStudent = (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
};
