import  {Schema, Types, model} from 'mongoose';


export interface IEmployee{
    fullName: string;
    position: string;
    email: string;
    contactAdress: Types.ObjectId;
    office: Types.ObjectId;
    roles: Types.ObjectId;
}

const employeeSchema = new Schema<IEmployee>({
    fullName: {type: String, required: true},
    position: {type: String, required: true},
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    contactAdress: {
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    },
    office: {
        type: Schema.Types.ObjectId, 
        ref: 'Office'
    },
    roles: [
        {
        type: Schema.Types.ObjectId,
        ref: 'role',
    },
],
});

export const Employee = model<IEmployee>('employee', employeeSchema);
