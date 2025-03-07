import { model, Schema } from 'mongoose';
import { IGuardian, IName, IStudent, studentModel } from './student.interface';
import bcrypt from 'bcrypt';

const nameSchema = new Schema<IName>({
  firstName: { type: String, required: [true, 'First name is required'] },

  middleName: { type: String },
  lastName: { type: String },
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
const studentSchema = new Schema<IStudent, studentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {
      type: nameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: "'{VALUE} is not supported' : use 'male' or 'female'",
      },
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, min: [6, 'Too few eggs'], max: 12 },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not supported',
      },
    },
    academicSemester: { type: String, required: true },
    academicDepartment: { type: String, required: true },
    academicFaculty: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware
studentSchema.pre('save', async function () {
  // console.log('pre save middleware');
  // hashing password before saving
  const user = this;
  user.password = await bcrypt.hash(user.password as string, 10);
});

// post save middleware
studentSchema.post('save', function () {
  this.password = '';
});

// 1. Create a Schema corresponding to the document interface.
studentSchema.pre('find', function (next) {
  // same two line of code
  // this.find({ isDeleted: false });
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: false });
  next();
});
// [ { '$match': { isDeleted: false } },  { '$match': { _id: new ObjectId('67c7f13b46630eb6699f9720') } } ]
studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  // this.pipeline().unshift({ $match: { isDeleted: false } });
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// 2. Create a Schema corresponding to the document interface.
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// 3. Create a Model.
export const Student = model<IStudent, studentModel>('Student', studentSchema);
