import { Schema, Types, model} from 'mongoose';


export interface IOffice{
    contactAdress: Types.ObjectId;
    employees: Types.ObjectId[];
}

const officeSchema = new Schema<IOffice>({
    contactAdress: {
        type: Schema.Types.ObjectId,
        ref: 'adress',
        required: true,
        unique: true
    },
    employees:[
        {
            type: Schema.Types.ObjectId,
            ref: 'employee',
            required: false,
    }]
});


export const Office = model<IOffice>('office', officeSchema);