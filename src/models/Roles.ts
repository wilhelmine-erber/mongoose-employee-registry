import {Schema, Types, model} from 'mongoose';

export interface IRole{
    name: string;
    employee: Types.ObjectId[]; // Many-to-Many
}

const roleSchema = new Schema<IRole>({
    name: {type: String, required: true},
    employee: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'employee'
        }
    ]
});

export const Role = model<IRole>('role', roleSchema);