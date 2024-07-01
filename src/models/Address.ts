import { Schema, Types ,model} from 'mongoose';


export interface IAddress{
    streetName: string;
    streetNumber: string;
    areaCode: number;
    city: string;
    employee?: Types.ObjectId;
    office?: Types.ObjectId;
}

const addressSchema = new Schema<IAddress>({
    streetName: {
        type: String, 
        required: true
    },
    streetNumber: {
        type: String, 
        required: true
    },
    areaCode: {
        type: Number, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'employee',
    },
    office:{
        type: Schema.Types.ObjectId,
        ref: 'office',
    },
});


export const Address = model<IAddress>('address', addressSchema);
