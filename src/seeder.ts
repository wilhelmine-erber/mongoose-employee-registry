import {faker} from '@faker-js/faker';
import { connect } from './db';
import { Role } from './models/Roles';
import { Office } from './models/Office';
import { Employee } from './models/Employee';
import { Address, IAddress} from './models/Address';
import { off } from 'process';


async function main(){
    await connect();

    await Role.deleteMany();
    await Office.deleteMany();
    await Employee.deleteMany();
    await Address.deleteMany();

    await Role.insertMany([
        { name: 'Developer'},
        { name: 'Manager'},
        { name: 'Marketing'},
        { name: 'HR'},
        { name: 'Management'},
    ]);


    const addresses: IAddress[] = Array.from({length: 15}, ()=>({
        streetName: faker.location.street(),
        streetNumber: faker.location.buildingNumber(),
        city: faker.location.city(),
        areaCode: parseInt(faker.location.zipCode()),
    }))

    await Address.insertMany(addresses);

    for(let i=0; i<3; i++){
        const contactAddress = await Address.findOne({
            office: {$exists: false},
        });
        const office = await Office.create({ contactAdress: contactAddress?._id});
        await contactAddress?.updateOne({ office: office._id});
    }

    
}


main().then(()=>process.exit())